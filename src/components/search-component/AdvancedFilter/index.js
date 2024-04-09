import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  AdvancedSection,
  BodySection,
  ButtonContainer,
  FieldLabel,
  FieldSection,
  FieldWrapper,
  FiltersContainer,
  InnerSection,
  InnerSectionTitle,
  SectionFooter,
  TextInput,
  ToggleContainer,
  ToggleLabel,
} from './index.sc';
import { Button } from '../../button';
import SearchIcon from '../assets/icons/SearchIcon';
import ToggleSwitch from '../../toggle-switch';
import MultiselectDropdown from '../../dropdown';

const AdvancedFilter = ({ handleAdvancedCancel, handleAdvancedSubmit }) => {
  const [formData, setFormData] = useState({});

  const formFields = useMemo(() => {
    return [
      {
        section: 'Keywords',
        fields: [
          {
            type: 'text',
            label: 'Include all of these',
            name: 'keywords_all',
            value: formData?.keywords_all,
            caseSensitive: false,
            range: {
              min: 20,
              max: 80,
            },
            required: true,
          },
          {
            type: 'text',
            label: 'Include none of these',
            name: 'keywords_none',
            value: formData?.keywords_none,
            caseSensitive: false,
            range: {
              min: 20,
              max: 80,
            },
            required: true,
          },
          {
            type: 'text',
            label: 'Include any of these',
            name: 'keywords_any',
            value: formData?.keywords_any,
            caseSensitive: false,
            range: {
              min: 20,
              max: 80,
            },
            required: true,
          },
          {
            type: 'text',
            label: 'Include these in title',
            name: 'keywords_title',
            value: formData?.keywords_title,
            caseSensitive: false,
            range: {
              min: 20,
              max: 80,
            },
            required: true,
          },
          {
            type: 'text',
            label: 'Exclude these in title',
            name: 'keywords_exclude',
            value: formData?.keywords_exclude,
            caseSensitive: false,
            range: {
              min: 20,
              max: 80,
            },
            required: true,
          },
        ],
      },
      {
        section: 'Sources',
        fields: [
          {
            type: 'multiselect',
            label: 'Include all of these',
            name: 'all',
            value: formData?.all,
            required: true,
            options: [],
          },
          {
            type: 'multiselect',
            label: 'Include some of these',
            name: 'some',
            value: formData?.some,
            required: true,
            options: [],
          },
          {
            type: 'multiselect',
            label: 'Exclude all of these',
            name: 'exclude',
            value: formData?.exclude,
            required: true,
            options: [],
          },
        ],
      },
      {
        section: 'Spam Exclusions',
        fields: [
          {
            type: 'multiselect',
            name: 'exclude',
            value: formData?.exclude,
            required: true,
            options: [],
          },
        ],
      },
    ];
  }, [formData]);

  const onFormDataChange = (name, value) => {
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'multiselect':
        return (
          <MultiselectDropdown
            count={false}
            // options={[]}
            // onSelect={(e) => console.log(e)}
          />
        );
      default:
        return (
          <TextInput
            placeholder="Keywords"
            name={field.name}
            value={field.value}
            onChange={(e) => {
              const { name, value } = e.target;
              onFormDataChange(name, value);
            }}
          />
        );
    }
  };

  return (
    <AdvancedSection>
      <BodySection>
        <InnerSection>
          {formFields.map((section) => {
            return (
              <>
                <InnerSectionTitle>{section.section}</InnerSectionTitle>
                <FieldSection>
                  {section.fields.map((item, j) => {
                    return (
                      <FieldWrapper key={j}>
                        <FieldLabel>{item?.label}</FieldLabel>
                        {renderField(item)}
                        <FiltersContainer>
                          {Object.hasOwn(item, 'caseSensitive') && (
                            <ToggleContainer>
                              <ToggleSwitch
                              // name={name}
                              // disabled={disabled}
                              // checked={checked}
                              // onChange={({ name, checked }) =>
                              //   handleToggle(name, checked, 'large')
                              // }
                              />
                              <ToggleLabel>Case Sensitive</ToggleLabel>
                            </ToggleContainer>
                          )}
                          {/* {item?.range &&
                                  <RangeSlider />

                                  } */}
                        </FiltersContainer>
                      </FieldWrapper>
                    );
                  })}
                </FieldSection>
              </>
            );
          })}
        </InnerSection>
      </BodySection>
      <SectionFooter>
        <div
          style={{
            fontWeight: '300',
            fontSize: '13px',
            lineHeight: '16px',
            color: '000000',
          }}
        >
          Save Search
        </div>
        <ButtonContainer>
          <Button
            title="Cancel"
            backgroundColor="#585858"
            onClick={() => {
              handleAdvancedCancel && handleAdvancedCancel();
              setFormData({});
            }}
          />
          <Button
            title="Search"
            iconPosition="left"
            icon={<SearchIcon width="18" height="18" />}
            backgroundColor="#585858"
            onClick={() =>
              handleAdvancedSubmit && handleAdvancedSubmit(formData)
            }
          />
        </ButtonContainer>
      </SectionFooter>
    </AdvancedSection>
  );
};

export default AdvancedFilter;

AdvancedFilter.propTypes = {
  handleAdvancedCancel: PropTypes.func,
  handleAdvancedSubmit: PropTypes.func,
};
