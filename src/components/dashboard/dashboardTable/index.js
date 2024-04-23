import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Frames } from '../../search-popup/contents';
import { ContentBox } from '../../search-popup/ContentBox';
import PropTypes from 'prop-types';
// import { axiosPostRequest, axiosPutRequest } from '../../../service';
import { useQueryClient } from '@tanstack/react-query';
import DashboardPopup from '../../dasboard-popup';
import CustomConfirmationPopUp from '../../customize-confirmation-popup';
import SaveSourcePopup from '../../save-source';
import {
  useDeleteSaveDashboardData,
  useEditSaveDashboardData,
} from '../../../hooks/useSaveDashboard';
import toast from 'react-hot-toast';
import { getDateParams } from '../../../utils';
// import { Item } from '../../custom-drawer/mock';

const DashboardTable = ({
  setLength,
  data,
  dataAmx,
  fetchNextPage,
  isLoading,
  handleFilter,
  sortBy,
  orderBy,
  dashboardType,
  setDashboardType,
  setSearchType,
  searchQuery,
  debouncedSearch,
}) => {
  const [checkeditems, setCheckedItems] = useState([]);
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const queryClient = useQueryClient();
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [savePopup, setSavePopup] = useState(false);
  const [selectedItem, setSeleteditem] = useState({});
  const [deleteData, setDeleteData] = useState([]);
  const [updateCheckBox, setUpdateCheckBox] = useState(1);
  const navigate = useNavigate();
  const { mutateAsync: deleteSavedDashboardQuery } =
    useDeleteSaveDashboardData();
  const { mutateAsync: createEditDashboardData } = useEditSaveDashboardData();

  const handleClick = (item) => {
    let searchParams = item?.params;
    const dateParams = getDateParams(searchParams?.dateTime);
    searchParams = {
      ...searchParams,
      dateTime: dateParams,
    };
    navigate(`/dashboard/${item.id}/${item?.type}/${item.id}`, {
      state: {
        data: null,
        filters: searchParams,
        savedDashboardData: item,
        search_name: item?.search_name || '',
      },
    });
  };

  const deleteSavedDashboards = async (items) => {
    const deleteId = {
      dashboard_ids: items,
    };
    try {
      await deleteSavedDashboardQuery(deleteId, {
        onSuccess: () => {
          toast.success('Deleted Saved Dashboard Successfully');
          setCheckedItems([]);
          setUpdateCheckBox((prev) => prev + 1);
        },
      });
    } catch (error) {
      console.log('error', error);
      toast.error('Failed to delete dashboard');
    }
  };

  // const { mutate: deleteSavedDashboards } = useMutation({
  //   mutationFn: handleDeleteSavedDashboards,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: [
  //         'saved-dashboard-list',
  //         dashboardType,
  //         sortBy,
  //         orderBy,
  //         debouncedSearch,
  //       ],
  //     });
  //     setCheckedItems([]);
  //   },
  // });

  const handleDelete = (data) => {
    setConfirmationPopUp(true);
    if (data.length > 0) {
      const deletePayload = data.map((item) => item.id);
      setDeleteData(deletePayload);
    }
  };
  const handleEditDelete = (data) => {
    setConfirmationPopUp(true);
    setDeleteData([data?.id]);
  };
  const handleConfirmDelete = () => {
    deleteSavedDashboards(deleteData);
    setConfirmationPopUp(false);
  };
  const handleSaveDashborad = async (data, isEdit) => {
    const editedData = {
      dashboard_id: selectedItem.id,
      name: data.name,
      description: data.description,
    };
    if (isEdit) {
      await createEditDashboardData(editedData, {
        onSuccess: () => {
          toast.success('Dashboard updated successfully');
        },
      });
    }
  };

  return (
    <>
      <ContentBox
        // data={data}
        dataAmx={dataAmx}
        checkeditems={checkeditems}
        bookmarkedItems={bookmarkedItems}
        isPopup={false}
        Frames={Frames}
        updateCheckBox={updateCheckBox}
        handleLoad={fetchNextPage}
        handleCheckedItems={setCheckedItems}
        handleBookmarkedItems={setBookmarkedItems}
        handleFilter={handleFilter}
        isLoading={isLoading}
        titleClick={handleClick}
        handleClick={() => {}}
        toggler={() => {}}
        isIcons={true}
        isCheckBox={true}
        bookMardClick={true}
        dotClick={true}
        savedIcon={true}
        showRecent={true}
        isTriangle={true}
        sortBy={sortBy}
        orderBy={orderBy}
        dashboardType={dashboardType}
        setDashboardType={setDashboardType}
        setSearchType={setSearchType}
        searchQuery={searchQuery}
        handleDelete={handleDelete}
        handleEditDelete={handleEditDelete}
        setSavePopup={setSavePopup}
        setSeleteditem={setSeleteditem}
      />
      <DashboardPopup
        open={confirmationPopUp}
        toggler={setConfirmationPopUp}
        popContent={
          <CustomConfirmationPopUp
            Heading={'Delete Dashboard'}
            SecondHeading={'Are you sure you want to delete?'}
            toggler={setConfirmationPopUp}
            handleDelete={handleConfirmDelete}
          />
        }
        padding="0"
        borderRadius="0.625rem"
        width="35rem"
      />
      <DashboardPopup
        popContent={
          <SaveSourcePopup
            heading="Save Dashboard"
            toggler={(value) => {
              setSavePopup(value);
              setSeleteditem('');
            }}
            selectedItem={{
              name: selectedItem?.name,
              description: selectedItem?.description,
            }}
            handleSaveDashboard={handleSaveDashborad}
          />
        }
        open={savePopup}
        toggler={setSavePopup}
        padding="0"
        borderRadius="0.625rem"
        width={'43.75rem'}
      />
    </>
  );
};

DashboardTable.propTypes = {
  setLength: PropTypes.func,
  data: PropTypes.object,
  dataAmx: PropTypes.object,
  sortBy: PropTypes.string,
  orderBy: PropTypes.string,
  fetchNextPage: PropTypes.func,
  handleFilter: PropTypes.func,
  setSearchType: PropTypes.func,
  setDashboardType: PropTypes.func,
  dashboardType: PropTypes.string,
  searchQuery: PropTypes.string,
  isLoading: PropTypes.bool,
  debouncedSearch: PropTypes.string,
};

export default DashboardTable;
