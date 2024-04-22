import React from 'react';
import {
  Label,
  LinkDetailLabelFieldWrp,
  LinkDetailSection,
  LinkDetailWrpFields,
  LinkInput,
  LinkSubmit,
  LinkTextArea,
  LinkWrp,
  MultiFilterContainer,
  SingleFilterWrapper,
} from './index.sc';
import PropTypes from 'prop-types';
import SimilarData from '../../pages/news-letter/newsletter-add-section/add-item-component/edit-article/SimilarData';

const MultiFilter = ({
  entryData,
  setEntryData,
  onLinkFetch,
  fetchButtonText,
  showFields,
  similarNewsData,
  showSimilarNews,
  setShowSimilarNews,
  setSimilarNewsData,
}) => {
  const onChange = (e) => {
    const { name, value } = e.target;
    setEntryData((latestEntryData) => {
      return {
        ...latestEntryData,
        [name]: value,
      };
    });
  };

  const defaultData = [{ title: '', link: '' }];

  return (
    <>
      <MultiFilterContainer>
        <SingleFilterWrapper>
          <LinkWrp length={showFields}>
            <React.Fragment>
              <LinkDetailLabelFieldWrp>
                <Label> Article Link</Label>
                <LinkInput
                  type="text"
                  name="link"
                  value={entryData?.link || ''}
                  onChange={onChange}
                />
                <LinkSubmit onClick={onLinkFetch}>{fetchButtonText}</LinkSubmit>
              </LinkDetailLabelFieldWrp>
              {showFields && (
                <>
                  <LinkDetailLabelFieldWrp>
                    <Label>Article Title</Label>
                    <LinkTextArea
                      type="text"
                      name="title"
                      value={entryData?.title || ''}
                      onChange={onChange}
                      rows={2}
                    />
                  </LinkDetailLabelFieldWrp>

                  <LinkDetailLabelFieldWrp>
                    <Label>Article Description</Label>
                    <LinkTextArea
                      type="text"
                      name="content"
                      value={entryData?.content || ''}
                      onChange={onChange}
                      rows={5}
                    />
                  </LinkDetailLabelFieldWrp>

                  <LinkDetailLabelFieldWrp>
                    <Label>Image URL</Label>
                    <LinkInput
                      type="text"
                      name="imagePublicUrl"
                      value={entryData?.imagePublicUrl || ''}
                      onChange={onChange}
                    />
                  </LinkDetailLabelFieldWrp>

                  <LinkDetailLabelFieldWrp>
                    <Label>Publication Name</Label>
                    <LinkInput
                      type="text"
                      name="publication"
                      value={entryData?.publication || ''}
                      onChange={onChange}
                    />
                  </LinkDetailLabelFieldWrp>

                  <LinkDetailWrpFields>
                    <LinkDetailSection>
                      <Label>Date of Publication</Label>
                      <LinkInput
                        type="date"
                        placeholder="mm/dd/yyyy"
                        name="date"
                        value={entryData?.date || ''}
                        onChange={onChange}
                      />
                    </LinkDetailSection>

                    <LinkDetailSection>
                      <Label>Location</Label>
                      <LinkInput
                        type="text"
                        placeholder="Enter location"
                        name="place"
                        value={entryData?.place || ''}
                        onChange={onChange}
                      />
                    </LinkDetailSection>
                  </LinkDetailWrpFields>
                  <LinkDetailWrpFields>
                    <LinkDetailSection>
                      <Label>Author</Label>
                      <LinkInput
                        type="text"
                        placeholder="Enter Author"
                        name="author"
                        value={entryData?.author || ''}
                        onChange={onChange}
                      />
                    </LinkDetailSection>

                    <LinkDetailSection>
                      <Label>Article Type</Label>
                      <LinkInput
                        type="text"
                        placeholder="Enter Article Type"
                        name="newsType"
                        value={entryData?.newsType || ''}
                        onChange={onChange}
                      />
                    </LinkDetailSection>
                  </LinkDetailWrpFields>
                  <SimilarData
                    similarNewsData={similarNewsData}
                    shouldShowSimilarNews={showSimilarNews}
                    onChange={(name, data, e) => {
                      if (name === 'similarNews') {
                        setShowSimilarNews(data);
                        if (data) {
                          setSimilarNewsData([...defaultData]);
                        }
                      } else {
                        setSimilarNewsData(data);
                      }
                    }}
                  />
                </>
              )}
            </React.Fragment>
          </LinkWrp>
        </SingleFilterWrapper>
      </MultiFilterContainer>
    </>
  );
};
MultiFilter.propTypes = {
  entryData: PropTypes.object,
  setEntryData: PropTypes.func,
  onLinkFetch: PropTypes.func,
  fetchButtonText: PropTypes.string,
  showFields: PropTypes.bool,
  similarNewsData: PropTypes.array,
  setShowSimilarNews: PropTypes.func,
  showSimilarNews: PropTypes.bool,
  setSimilarNewsData: PropTypes.func,
};

export default MultiFilter;
