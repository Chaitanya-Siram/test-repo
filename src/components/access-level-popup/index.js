import React from 'react';
import {
  HeadingText,
  MainWrp,
  // PopUpBottom,
  // PopUpTop,
  PopUpWrp,
  PopupCloseBtnWrp,
  RowHeader,
  Subtext,
  TableArea,
  TableData,
  TableHeader,
  TableRow,
  TableWrapper,
  TextArea,
} from './index.sc';
import CheckCircle from '../../assets/icons/CheckCircle';
import CrossCircle from '../../assets/icons/CrossCircle';

import PropTypes from 'prop-types';
import Close from '../../assets/icons/Close';
import { useSelector } from 'react-redux';
import { theme } from '../../constants/theme';

const table = [
  {
    header: ['', 'Admin', 'Analyst', 'Reader'],
  },
  {
    content: [
      {
        label: 'Add/Delete User',
        value: 'add_delete_user',
        admin: true,
        analyst: false,
        reader: false,
      },
      {
        label: 'Search',
        value: 'search',
        admin: true,
        analyst: true,
        reader: false,
      },
      {
        label: 'Export Results',
        value: 'export_results',
        admin: true,
        analyst: false,
        reader: false,
      },
      {
        label: 'Create/Edit Dashboard',
        value: 'create_edit_dashboards',
        admin: true,
        analyst: true,
        reader: true,
      },
      {
        label: 'View/Use Dashboard',
        value: 'view_use_dashboards',
        admin: true,
        analyst: true,
        reader: false,
      },
      {
        label: 'Create/Edit Newsletter',
        value: 'create_edit_newsletter',
        admin: true,
        analyst: false,
        reader: true,
      },
      {
        label: 'View/Use Newsletter',
        value: 'view_use_newsletter',
        admin: true,
        analyst: true,
        reader: false,
      },
    ],
  },
];

const AccessLevelPopup = ({ isOpen, handlePopupClick }) => {
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  return (
    <>
      {isOpen && <MainWrp isOpen={isOpen} onClick={() => handlePopupClick()} />}
      {/* <PopUpTop></PopUpTop> */}
      <PopUpWrp isOpen={isOpen}>
        <PopupCloseBtnWrp onClick={handlePopupClick}>
          <Close height="18" width="18" color={theme[selectedTheme].text} />
        </PopupCloseBtnWrp>
        <TextArea>
          <HeadingText>Understanding Access Levels</HeadingText>
          <Subtext>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            consequat dui scelerisque neque bibendum, ut fringilla mauris
            rhoncus. Aenean mauris dui, rhoncus non tellus ut, fermentum
            pharetra sem.
          </Subtext>
        </TextArea>
        <TableArea>
          <TableWrapper>
            <thead>
              <TableRow>
                {table[0].header.map((label, index) => (
                  <TableHeader key={index}>{label}</TableHeader>
                ))}
              </TableRow>
            </thead>
            <tbody>
              {table[1].content.map((item, indexx) => {
                return (
                  <TableRow key={indexx}>
                    <RowHeader>{item.label}</RowHeader>
                    <TableData>
                      {item.admin ? (
                        <CheckCircle
                          width={'25'}
                          height={'25'}
                          fill={'#00B929'}
                        />
                      ) : (
                        <CrossCircle />
                      )}
                    </TableData>
                    <TableData>
                      {item.analyst ? (
                        <CheckCircle
                          width={'25'}
                          height={'25'}
                          fill={'#00B929'}
                        />
                      ) : (
                        <CrossCircle />
                      )}
                    </TableData>
                    <TableData>
                      {item.reader ? (
                        <CheckCircle
                          width={'25'}
                          height={'25'}
                          fill={'#00B929'}
                        />
                      ) : (
                        <CrossCircle />
                      )}
                    </TableData>
                  </TableRow>
                );
              })}
            </tbody>
          </TableWrapper>
        </TableArea>
      </PopUpWrp>
      {/* <PopUpBottom></PopUpBottom> */}
    </>
  );
};

AccessLevelPopup.propTypes = {
  isOpen: PropTypes.bool,
  handlePopupClick: PropTypes.func,
};

export default AccessLevelPopup;
