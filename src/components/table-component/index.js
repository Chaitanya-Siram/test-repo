import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Proptypes from 'prop-types';
import {
  AccessLevelBtnWrp,
  ButtonCon,
  ButtonText,
  CheckBox,
  CheckboxCell,
  FlexDiv,
  IconCon,
  NoDataMsg,
  NoDataTableCell,
  Table,
  TableBody,
  TableCell,
  TableCellWrp,
  TableContainer,
  TableHead,
  TableHeader,
  TempTableHeader,
  TableHeaderValueWrp,
  TableRow,
  TextContentWrp,
  ValueSubTitle,
  ValueTitle,
  ThreedotsWrpr,
  // DropDownWrpr,
  // DropDownButton,
  DeleteMainWrp,
  DeleteTextWpr,
  IconTableCell,
  KeywordsContainerWrap,
  KeyWordText,
  KeyWordConnecter,
  EditIconWrapper,
} from './index.sc';
import Info from '../../assets/icons/Info';
import Avatar from '../avatar';
import UserAccessLevelPopup from '../user-access-level';
import AccessLevelBtn from '../access-level-button';
// import Spinner from '../spinner';
import { useSelector } from 'react-redux';
import { theme } from '../../constants/theme';
import { debounce } from '../../constants/debounce';
import DownPolygon from '../../assets/icons/DownPolygon';
import { LoadingWrp } from '../search-result/article-section/index.sc';
import { VerticleDots } from '../../assets/icons/VerticleDots';
import {
  // DeleteMainWrp,
  // DeleteTextWpr,
  EditIconWrp,
  EditOption,
} from '../search-popup/index.sc';
import DashboardPopup from '../dasboard-popup';
import CustomConfirmationPopUp from '../customize-confirmation-popup';
import {
  axiosDel,
  // axiosMultipleDelete,
  // axiosPostRequest,
  axiosPutRequest,
} from '../../service';
import Delete1 from '../../assets/icons/Delete1';
import Edit2 from '../../assets/icons/Edit2';

import SaveSourcePopup from '../save-source';
import { API } from '../../constants';
import toast from 'react-hot-toast';

// add status-color configuration when available
const StatusButton = ({ status }) => {
  return (
    <ButtonCon status={status}>
      <ButtonText status={status}>{status}</ButtonText>
    </ButtonCon>
  );
};

StatusButton.propTypes = {
  status: Proptypes.string,
};

const Customtable = ({
  isLoading,
  error,
  tableHeaders = [],
  tableData = [],
  handlePopupClick = () => {},
  length,
  data = {
    pages: [],
    pageParams: [],
  },
  pageLimit,
  handleLoad,
  infiniteLoading = false,
  handleSortClick,
  sortBy,
  sortOrder,
  editIcon = false,
  showEditUser = false,
  setShowEditUser = () => {},
  setSingleRowData = () => {},
  tableFor = '',
  setDeleteConfirm = () => {},
}) => {
  const queryClient = useQueryClient();
  const { pages, pageParams } = data;
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openedIndex, setOpenedIndex] = useState(-1);
  const [openDropDown, setOpenDropDown] = useState(-1);
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  // const queryClient = useQueryClient();
  // const [checkeditems, setCheckedItems] = useState([]);

  const updateAlertDetails = (data) => {
    return axiosPutRequest('/users', {}, { data });
  };
  const { mutate: updateFunc } = useMutation({
    mutationFn: updateAlertDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });

  const handleDelete = () => {
    setConfirmationPopUp(true);
    // handleConfirmDelete();
  };
  // const tooltipRef = useRef(null);
  // // for closing the edit/delete div if we click outside the div
  // useEffect(() => {
  //   function handleClickOutside() {
  //     setOpenDropDown(false);
  //     // e?.stopPropagation();
  //   }
  //   document.addEventListener('click', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, []);
  // console.log('seelctedOptin');

  useEffect(() => {
    function handleClickOutside(event) {
      if (event.target.closest('.ThreedotsWrpr') === null) {
        setOpenDropDown(-1);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const [rowData, setRowData] = useState({});
  const [editPopup, setEditPopup] = useState(false);

  useEffect(() => {
    if (tableData?.length > 0 && selectedRows?.length === tableData?.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedRows, tableData]);

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const handleDeleteSingleUser = (items) => {
    // return axiosPostRequest(
    // `${API}/delete-user`,
    return axiosDel(
      `${API}/settings/user_remove/`,
      {},
      { user_id: selectedRows }
      // {
      //   data: selectedRows,
      // }
    ).then((resp) => {
      console.log(resp);
      if (resp?.status === 'success') {
        setDeleteConfirm(true);
        toast.success(resp?.data?.message);
      } else {
        toast.error(resp?.data?.message);
      }
    });
  };

  // const { mutate: deleteSingleUser } = useMutation({
  //   mutationFn: handleDeleteSingleUser,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ['users-data', sortBy, sortOrder],
  //     });
  //     // setCheckedItems([]);
  //   },
  // });

  const toggleRowSelection = (rowId) => {
    let updatedRows;
    if (selectedRows.includes(rowId)) {
      updatedRows = selectedRows.filter((id) => id !== rowId);
    } else {
      updatedRows = [...selectedRows, rowId];
    }
    setSelectedRows(updatedRows);
  };

  const handleEditClick = (row) => {
    setRowData(row);
    setEditPopup(true);
  };

  const handleEdit = ({ dashboardName, dashboardDescription }) => {
    const keyWordsArray = dashboardDescription.split(' OR ');
    axiosPutRequest(
      '/edit-theme-data',
      {
        id: rowData?.id,
      },
      {
        ...rowData,
        theme_name: { ...rowData.theme_name, title: dashboardName },
        keywords: keyWordsArray,
      }
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      const rowIds = tableData.map((item) => item.id);
      setSelectedRows(rowIds);
    }

    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  function handleUserAccessLevelClick(singleRow) {
    setShowEditUser(!showEditUser);
    setSingleRowData(singleRow);
    // if (openedIndex === index) {
    //   setOpenedIndex(-1); // Close the popup if the same row is clicked again
    // } else {
    //   setOpenedIndex(index); // Open the popup for the clicked row index
    // }
  }

  const getTableCellValue = (row, colKey, index) => {
    if (colKey === 'name') {
      return (
        <FlexDiv>
          <Avatar name={row[colKey].title} />
          <TextContentWrp>
            <ValueTitle>{row[colKey].title}</ValueTitle>
            <ValueSubTitle>{row[colKey].subTitle}</ValueSubTitle>
          </TextContentWrp>
        </FlexDiv>
      );
    } else if (colKey === 'status') {
      return <StatusButton status={row[colKey]} />;
    } else if (colKey === 'access_level') {
      return (
        <>
          <AccessLevelBtnWrp>
            <AccessLevelBtn
              accessLevel={row[colKey]}
              handleClick={() => handleUserAccessLevelClick(row)}
              isActive={openedIndex === index}
            />
            {openedIndex === index && (
              <UserAccessLevelPopup
                data={row}
                index={index}
                openedIndex={openedIndex}
                setOpenedIndex={setOpenedIndex}
                handlePopupClick={handlePopupClick}
              />
            )}
          </AccessLevelBtnWrp>
        </>
      );
    }
    if (colKey === 'theme_name') {
      return (
        <FlexDiv>
          <TextContentWrp>
            <ValueTitle>{row[colKey].title}</ValueTitle>
            <ValueSubTitle>{row[colKey].subTitle}</ValueSubTitle>
          </TextContentWrp>
        </FlexDiv>
      );
    }
    if (colKey === 'keywords') {
      return (
        <FlexDiv>
          <KeywordsContainerWrap>
            {row[colKey].map((key, index) => (
              <React.Fragment key={index}>
                <KeyWordText>{key}</KeyWordText>
                <KeyWordConnecter>
                  {index < row[colKey].length - 1 && 'OR'}
                </KeyWordConnecter>
              </React.Fragment>
            ))}
          </KeywordsContainerWrap>
        </FlexDiv>
      );
    } else {
      return row[colKey];
    }
  };

  const getColWidth = (colKey) => {
    if (colKey) {
      const findCol = tableHeaders?.find((row) => row.value === colKey);
      return findCol?.width || '100px';
    }
    return '';
  };

  const handleIconClick = (col) => {
    if (col?.isSortable) {
      handleSortClick(col?.value);
    } else if (col?.showPopup) {
      handlePopupClick();
    }
  };

  const showNoDataMsg = () => {
    if (!infiniteLoading && !tableData?.length) {
      return true;
    } else if (infiniteLoading && !pages?.length && !pageParams?.length) {
      return true;
    } else {
      return false;
    }
  };

  const observerTarget = useRef(null);

  useEffect(() => {
    const handleLoadClick = debounce(() => {
      // handleLoad();
      setSelectAll(false);
    }, 1000);

    const showLoadMore = () => {
      if (pageParams && pageParams?.length) {
        const pageNo = pageParams?.length;
        if (pageLimit * pageNo > length) {
          return false;
        }
        return true;
      }
      return false;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && showLoadMore()) {
          handleLoadClick();
          console.log('Intersection');
        }
      },
      { threshold: 1 }
    );

    const currentValue = observerTarget.current;

    if (currentValue) {
      observer.observe(currentValue);
    }

    return () => {
      if (currentValue) {
        observer.unobserve(currentValue);
      }
    };
  }, [observerTarget, length, pageLimit, pageParams]);

  if (isLoading) return <LoadingWrp>Loading...</LoadingWrp>;

  if (error) {
    console.log(error.message);
  }

  const handleEditDelete = () => {
    setConfirmationPopUp(true);
  };

  const disableUser = (id) => {
    updateFunc({ id, disable: true });
    setOpenDropDown(-1);
  };

  const handleConfirmDelete = () => {
    // deleteSingleUser(openDropDown);
    handleDeleteSingleUser();
    setConfirmationPopUp(false);
    setOpenDropDown(-1);
    setSelectedRows([]);
  };

  const cancelbutton = () => {
    setOpenDropDown(-1);
    setConfirmationPopUp(false);
  };
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead className="table-header">
            <TableRow className="table-row">
              <CheckboxCell className="fixed-50">
                <CheckBox
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                />
              </CheckboxCell>
              {tableHeaders?.map((header, idx) => (
                <TableHeader
                  colWidth={header?.width ? header.width : 'auto'}
                  key={idx}
                >
                  <TableHeaderValueWrp
                    onClick={() => handleIconClick(header)}
                    isActive={sortBy === header?.value && sortOrder !== ''}
                  >
                    <span>{header?.label}</span>
                    <IconCon>
                      {header?.isSortable ? (
                        <DownPolygon
                          fill={
                            sortBy === header?.value && sortOrder !== ''
                              ? theme.light.primary
                              : theme.light.closeButton
                          }
                          isOpen={
                            sortBy === header?.value && sortOrder === 'asc'
                          }
                        />
                      ) : header?.showPopup ? (
                        <Info
                          color={theme[selectedTheme].primary}
                          onClick={handleIconClick}
                        />
                      ) : (
                        <></>
                      )}
                    </IconCon>
                  </TableHeaderValueWrp>
                </TableHeader>
              ))}
              {editIcon && <TempTableHeader colWidth={'1rem'} />}
              <TempTableHeader colWidth={'1rem'} />
            </TableRow>
          </TableHead>
          <TableBody className="table-body">
            {infiniteLoading
              ? pages?.map((page, i) => (
                  <Fragment key={i}>
                    {page?.data?.data?.tableData?.map((row, index) => (
                      <TableRow className="table-row" key={index}>
                        <CheckboxCell className="fixed-50">
                          <CheckBox
                            type="checkbox"
                            checked={selectedRows.includes(row?.id)}
                            onChange={() => toggleRowSelection(row?.id)}
                          />
                        </CheckboxCell>
                        {Object.keys(row).map(
                          (colKey) =>
                            colKey !== 'id' && (
                              <TableCell
                                colWidth={() => getColWidth(colKey)}
                                key={`${index}-${colKey}`}
                              >
                                <TableCellWrp>
                                  {getTableCellValue(row, colKey, index)}
                                </TableCellWrp>
                              </TableCell>
                            )
                        )}
                        {editIcon ? (
                          <IconTableCell colWidth={'5rem'}>
                            <EditIconWrapper
                              onClick={() => {
                                handleEditClick(row);
                              }}
                            >
                              <Edit2 />
                            </EditIconWrapper>
                          </IconTableCell>
                        ) : (
                          <></>
                        )}
                        <ThreedotsWrpr className="ThreedotsWrpr">
                          <div
                            onClick={() => {
                              // console.log(index, 'Im inside onClick');
                              if (openDropDown === index) {
                                setOpenDropDown(-1); // Close the popup if the same row is clicked again
                              } else {
                                setOpenDropDown(index); // Open the popup for the clicked row index
                                console.log(index);
                              }
                            }}
                          >
                            <VerticleDots />
                          </div>
                          {openDropDown !== -1 && index === openDropDown && (
                            <EditIconWrp
                              open={openDropDown === index}
                              // ref={tooltipRef}
                              // onClick={(e) => {
                              //   console.log('delete');
                              //   e.stopPropagation();
                              // }}
                            >
                              <EditOption onClick={() => handleEditDelete()}>
                                Delete
                              </EditOption>
                              {tableFor === 'manage_users' ? (
                                <EditOption
                                  onClick={() => disableUser(row?.id)}
                                >
                                  Disable
                                </EditOption>
                              ) : (
                                <></>
                              )}
                            </EditIconWrp>
                          )}
                        </ThreedotsWrpr>
                      </TableRow>
                    ))}
                  </Fragment>
                ))
              : tableData?.map((row, index) => (
                  <TableRow className="table-row" key={index}>
                    <CheckboxCell className="fixed-50">
                      <CheckBox
                        type="checkbox"
                        checked={selectedRows.includes(index)}
                        onChange={() => toggleRowSelection(index)}
                      />
                    </CheckboxCell>
                    {Object.keys(row).map(
                      (colKey) =>
                        colKey !== 'id' && (
                          <TableCell
                            colWidth={() => getColWidth(colKey)}
                            key={`${index}-${colKey}`}
                          >
                            <TableCellWrp>
                              {getTableCellValue(row, colKey, index)}
                            </TableCellWrp>
                          </TableCell>
                        )
                    )}
                  </TableRow>
                ))}
            {showNoDataMsg() && (
              <NoDataMsg>
                <NoDataTableCell colSpan="100">
                  Data is not available.
                </NoDataTableCell>
              </NoDataMsg>
            )}
            <tr ref={observerTarget}></tr>
          </TableBody>
        </Table>
        {selectedRows.length > 0 && (
          <DeleteMainWrp onClick={() => handleDelete(selectedRows)}>
            <Delete1 color="white" />
            <DeleteTextWpr>Delete</DeleteTextWpr>
          </DeleteMainWrp>
        )}
      </TableContainer>

      <DashboardPopup
        open={confirmationPopUp}
        toggler={setConfirmationPopUp}
        popContent={
          <CustomConfirmationPopUp
            Heading={'Delete User'}
            SecondHeading={'Are you sure you want to delete?'}
            toggler={setConfirmationPopUp}
            handleDelete={handleConfirmDelete}
            handleCancel={cancelbutton}
          />
        }
        handleCancel={cancelbutton}
        padding="0"
        borderRadius="0.625rem"
        width="35rem"
      />

      <DashboardPopup
        popContent={
          <SaveSourcePopup
            heading="Edit Theme"
            toggler={setEditPopup}
            primaryHeading="Theme Name"
            secondaryHeading="Keywords"
            selectedItem={{
              name: rowData?.theme_name?.title,
              description: rowData?.keywords?.join(' OR '),
            }}
            handleSaveDashboard={handleEdit}
          />
        }
        open={editPopup}
        toggler={setEditPopup}
        padding="0"
        borderRadius="0.625rem"
        width={'43.75rem'}
      />
    </>
  );
};

export default Customtable;

Customtable.propTypes = {
  isLoading: Proptypes.bool,
  error: Proptypes.object,
  tableHeaders: Proptypes.arrayOf(Proptypes.object),
  tableData: Proptypes.arrayOf(Proptypes.object),
  handlePopupClick: Proptypes.func,
  length: Proptypes.number,
  data: Proptypes.object,
  pageLimit: Proptypes.number,
  handleLoad: Proptypes.func,
  infiniteLoading: Proptypes.bool,
  handleSortClick: Proptypes.func,
  sortBy: Proptypes.string,
  sortOrder: Proptypes.string,
  editIcon: Proptypes.bool,
  setSingleRowData: Proptypes.func,
  showEditUser: Proptypes.bool,
  setShowEditUser: Proptypes.func,
  tableFor: Proptypes.string,
  setDeleteConfirm: Proptypes.func,
};
