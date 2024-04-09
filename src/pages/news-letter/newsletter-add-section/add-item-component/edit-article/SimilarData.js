import React, { useRef } from 'react';
import Proptypes from 'prop-types';
import {
  DropDownCheckBox,
  DropDownValueWrp,
} from '../article-toolbar/index.sc';
import {
  Label,
  LinkInput,
  LinkSubmit,
} from '../../../../../components/edit-article-filter-component/index.sc';
import ToolBarTrash from '../../../../../assets/icons/ToolBarTrash';
import Plus from '../../../../../assets/icons/Plus';

const SimilarData = ({ onChange, shouldShowSimilarNews, similarNewsData }) => {
  const onCheckBoxChange = (name, value, e) => {
    onChange && onChange(name, value, e);
  };

  const myElementRef = useRef();

  const onInputChange = (name, value, index, type, e) => {
    const data = [...similarNewsData];

    if (type === 'add') {
      data.push({ title: '', link: '' });
    } else if (type === 'delete') {
      data.splice(index, 1);
    } else if (type === 'edit') {
      data[index][name] = value;
    }
    onChange && onChange(name, data, e);
  };

  // const handleClick = () => {
  //   // Scroll to the element
  //   myElementRef.current.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'end',
  //     inline: 'end',
  //   });
  // };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '0.5rem',
        }}
      >
        <DropDownCheckBox
          id="checkbox"
          type="checkbox"
          checked={shouldShowSimilarNews}
          name="similarNews"
          onChange={(e) => {
            onCheckBoxChange(e.target.name, e.target.checked, e);
          }}
          style={{
            width: '1rem',
            height: '1rem',
          }}
        />
        <label
          style={{
            fontWeight: 500,
            fontSize: '0.89rem',
          }}
          htmlFor="checkbox"
        >
          Similar News
        </label>
      </div>
      {shouldShowSimilarNews &&
        similarNewsData?.map((newsData, index, array) => (
          <React.Fragment key={index}>
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                paddingBottom: '0.5rem',
                paddingTop: '0.5rem',
                width: '100%',
              }}
            >
              <div
                style={{
                  width: '40%',
                }}
              >
                {index === 0 && (
                  <Label style={{ padding: '0.2rem' }}>Publication Name</Label>
                )}
                <LinkInput
                  type="text"
                  name="title"
                  value={newsData?.title || ''}
                  onChange={(e) =>
                    onInputChange(
                      e.target.name,
                      e.target.value,
                      index,
                      'edit',
                      e
                    )
                  }
                />
              </div>
              <div
                style={{
                  width: '40%',
                }}
              >
                {index === 0 && (
                  <Label style={{ padding: '0.2rem' }}>Article Link</Label>
                )}
                <LinkInput
                  type="text"
                  name="link"
                  value={newsData?.link || ''}
                  onChange={(e) =>
                    onInputChange(
                      e.target.name,
                      e.target.value,
                      index,
                      'edit',
                      e
                    )
                  }
                />
              </div>
              <div style={{ width: '10%' }}>
                {array?.length - 1 === index && (
                  <>
                    {index === 0 && (
                      <>
                        <Label>&nbsp;</Label>
                        <br />
                      </>
                    )}
                    <LinkSubmit
                      onClick={(e) => {
                        onInputChange('', '', null, 'add', e);
                      }}
                      ref={myElementRef}
                    >
                      <Plus
                        color="#585858"
                        strokeWidth="3"
                        style={{ width: '0.9rem', height: '0.9rem' }}
                      />
                    </LinkSubmit>
                  </>
                )}

                {array?.length - 1 !== index && (
                  <>
                    {index === 0 && (
                      <>
                        <Label>&nbsp;</Label>
                        <br />
                      </>
                    )}
                    <LinkSubmit
                      onClick={(e) => onInputChange('', '', index, 'delete', e)}
                    >
                      <ToolBarTrash
                        style={{ width: '0.9rem', height: '0.9rem' }}
                      />
                    </LinkSubmit>
                  </>
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
    </>
  );
};

export default SimilarData;

SimilarData.propTypes = {
  onChange: Proptypes.func,
  shouldShowSimilarNews: Proptypes.bool,
  similarNewsData: Proptypes.array,
};
