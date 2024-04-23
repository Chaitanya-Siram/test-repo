import { toJpeg, toPng } from 'html-to-image';
import { Img } from '../../assets/img';
import { combineImagesWithLogo, dataURLtoBlob } from '../../constants/utils';
import JsPDF from 'jspdf';

export const useDownloadGraphsHook = () => {
  const onDownload = async (
    option,
    classNames,
    widget,
    setIsDocDownloading
  ) => {
    if (!option || !option.type || !classNames || classNames.length === 0) {
      console.error('Invalid download option or classNames');
      return;
    }
    setIsDocDownloading(true);

    try {
      const images = [];
      const logoUrl = Img.LogoWithText; // Update with the correct path to your logo

      for (const className of classNames) {
        const elements = document.getElementsByClassName(className);

        if (elements.length === 0) {
          console.warn(`No elements found with className: ${className}`);
          continue;
        }

        const containerElement = elements[0]; // Assuming you want the first element with the specified class

        // Set background color and padding for the container
        containerElement.style.backgroundColor = 'white';

        // Hide elements with the className 'hide-downloading'
        const elementsToHide =
          containerElement.getElementsByClassName('hide-downloading');
        Array.from(elementsToHide).forEach((element) => {
          element.style.display = 'none';
        });

        // Set opacity to 0 for elements with the className 'set-opacity-downloading'
        const elementsToSetOpacity = containerElement.getElementsByClassName(
          'set-opacity-downloading'
        );
        Array.from(elementsToSetOpacity).forEach((element) => {
          element.style.opacity = '0';
        });

        let dataUrl;

        if (option.type === 'Image') {
          // Capture the container as an image
          dataUrl = await toPng(containerElement, { pixelRatio: 4 });
        } else if (option.type === 'PDF') {
          // Capture the container as an image
          dataUrl = await toJpeg(containerElement, { pixelRatio: 4 });
        } else {
          throw new Error('Invalid download type. Use "Image" or "PDF".');
        }

        // Reset the styles to make the hidden portions visible again
        Array.from(elementsToHide).forEach((element) => {
          element.style.display = 'block';
        });

        // Reset opacity for elements with the className 'set-opacity-downloading'
        Array.from(elementsToSetOpacity).forEach((element) => {
          element.style.opacity = '1';
        });

        // Reset the background color of the container
        containerElement.style.backgroundColor = 'transparent';

        images.push({ dataUrl, containerElement });
      }

      if (option.type === 'Image') {
        // Combine the images into a single image with the logo on top
        const combinedImage = await combineImagesWithLogo(
          images.map((img) => img.dataUrl),
          logoUrl
        );

        // Convert the combined image data URL to a Blob
        const blob = dataURLtoBlob(combinedImage);

        // Create a Blob URL
        const blobUrl = URL.createObjectURL(blob);

        // Create an invisible anchor element
        const downloadLink = document.createElement('a');
        downloadLink.setAttribute('href', blobUrl);
        downloadLink.setAttribute(
          'download',
          `${widget?.title || 'image'}.png`
        );
        document.body.appendChild(downloadLink);

        // Trigger a click on the anchor to start the download
        downloadLink.click();

        // Remove the download link from the document
        document.body.removeChild(downloadLink);
      } else if (option.type === 'PDF') {
        // Create a new jsPDF instance
        const pdf = new JsPDF('p', 'mm', 'a4');

        // Add each image to the PDF with the logo on top
        for (const img of images) {
          const { containerElement, dataUrl } = img;

          // Calculate aspect ratio
          const aspectRatio =
            containerElement.offsetWidth / containerElement.offsetHeight;

          // Add the image to the PDF with the logo on top, adjusting size and position
          const imageDataUrlWithLogo = await combineImagesWithLogo(
            [dataUrl],
            logoUrl
          );
          pdf.addImage(
            imageDataUrlWithLogo,
            'JPEG',
            10,
            10,
            190,
            190 / aspectRatio
          ); // Assuming A4 size and margins
          pdf.addPage(); // Add a new page for each image
        }

        // Save the PDF
        pdf.save(`${widget?.title || 'document'}.pdf`);
      }
    } catch (error) {
      console.error('Error capturing or downloading:', error);
    } finally {
      setIsDocDownloading(false);
    }
  };
  return { onDownload };
};
