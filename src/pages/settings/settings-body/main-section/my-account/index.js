import React, { useEffect, useState } from 'react';
import Tabs from '../../../../../components/tabs';
import { theme } from '../../../../../constants/theme';
// import { PoptabTitleBox } from '../../../../../components/custom-drawer/mock';
import CustomTable from '../../../../../components/table-component';
import {
  HeaderSection,
  Inputwrpr,
  LeftSection,
  RightSection,
  Searchwpr,
  TabContent,
  UserCountText,
  UserCountWrp,
  UsersText,
} from './index.sc';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  // axiosGet,
  axiosGetAPI,
  axiosPost,
  // axiosPostRequest,
  // axiosPutRequest,
  axiosUpdate,
} from '../../../../../service';
import { SearchIcon } from '../../../../../assets/icons/SearchIcon';
import { Button } from '../../../../../components/button';
import AddBlue from '../../../../../assets/icons/AddBlue';
import DashboardPopup from '../../../../../components/dasboard-popup';
import AddUserPopup from './add-user';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import useDebounce from '../../../../../hooks/useDebounce';
import ProfileSecurity from './profile-security';
import SubscriptionTab from './subscription-details';
import { TitleBox } from '../../../../../components/tabs/TabTitle';
import { getTokenData } from '../../../../../constants/validateToken';
import { getUserDetailsAPI } from '../../../../../redux/slices/userSlice';
import toast from 'react-hot-toast';
import { API } from '../../../../../constants';

const myAccountTabs = [
  {
    label: 'Subscription Details',
    type: 'subscription_details',
  },
  {
    label: 'Manage Users',
    type: 'manage_users',
  },
  {
    label: 'Usage & History',
    type: 'usage_history',
  },
  {
    label: 'Billing',
    type: 'billing',
  },
  {
    label: 'Profile & Security',
    type: 'profile_security',
  },
];

const tabToIndex = {};
const indexToTab = {};
myAccountTabs.forEach((tab, i) => {
  tabToIndex[tab.type] = i;
});
myAccountTabs.forEach((tab, j) => {
  indexToTab[j] = tab.type;
});

const Titletabs = myAccountTabs.map((ele, i) => {
  return {
    id: i,
    title: <TitleBox isHideDes={true} title={ele.label} />,
    content: <></>,
  };
});

const addBtnStyle = {
  color: theme.dark.text,
  fontFamily: 'Inter',
  fontSize: '0.9375rem',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: ' 1.125rem' /* 120% */,
  letterSpacing: '-0.01875rem',
};

const MyAccount = ({ handlePopupClick }) => {
  const { tab1, tab2 } = useParams();
  const navigate = useNavigate();
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 1000);
  const [showEditUser, setShowEditUser] = useState(false);
  const [rowData, setRowData] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [shouldFetchUserDetails, setShouldFetchUserDetails] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [updateConfirm, setUpdateConfirm] = useState(false);

  const dispatch = useDispatch();
  const userReqDetails = getTokenData();

  const pageLimit = 10;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!tab2) {
      navigate(`/settings/${tab1}/${indexToTab[0]}`);
    }
  }, [navigate, tab1, tab2]);

  const handleAddNewUser = (user) => {
    // return axiosPostRequest('/add-user', {}, user);
    return axiosPost(`${API}/settings/user/`, user, {});
  };

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const {
    mutate: addNewUser,
    data: newUserData,
    isSuccess,
    // isError,
    //  error: addNewUserError,
  } = useMutation({
    mutationFn: (newUser) => handleAddNewUser(newUser),
    onSuccess: (resp) => {
      if (resp?.status === 'error') {
        toast.error(resp?.data?.message);
      }
      queryClient.invalidateQueries({ queryKey: ['users-data'] });
    },
  });

  const handleShowAddUser = () => {
    setShowAddUser((old) => !old);
  };

  const handleSaveAddUser = (data) => {
    const newObj = Object.assign(data, {
      org_id: userDetails?.org_id,
      interest_areas: 'pharma',
      designation: 'Analyst',
    });
    addNewUser(newObj);
  };

  useEffect(() => {
    if (shouldFetchUserDetails) {
      console.log(setShouldFetchUserDetails);
      dispatch(getUserDetailsAPI(userReqDetails?.user_id))
        .then((resp) => {
          if (resp?.type === 'user/getAPIData/fulfilled') {
            setUserDetails(resp?.payload);
            setShouldFetchUserDetails(false);
            console.log(resp);
          }
        })
        .catch((err) => {
          toast.error(err?.msg);
        });
    }
  }, [dispatch, userReqDetails?.user_id, shouldFetchUserDetails]);

  const getUserData = async ({ pageParam = 1 }) => {
    console.log(userDetails);
    // return axiosGet('/users', {
    if (userDetails?.org_id) {
      return axiosGetAPI('/setting-organization/users', {
        org_id: userDetails?.org_id,
        limit: pageLimit,
        page: pageParam,
        search: debouncedSearch,
        sort_by: sortBy,
        sort_type: sortOrder,
      });
    }
  };

  const {
    data: userData,
    error,
    fetchNextPage,
    isLoading,
    // refetch,
  } = useInfiniteQuery({
    queryKey: [
      'users-data',
      sortBy,
      sortOrder,
      debouncedSearch,
      userDetails?.org_id,
      deleteConfirm,
      updateConfirm,
    ],
    queryFn: getUserData,
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  const handleLoad = () => {
    fetchNextPage();
  };

  const handleTabs = (index) => {
    setIndex(index);
    navigate(`/settings/${tab1}/${indexToTab[index]}`);
  };

  const handleSortClick = (value) => {
    if (value === sortBy) {
      setSortOrder((prevSortOrder) =>
        prevSortOrder === 'asc' ? 'desc' : prevSortOrder === 'desc' ? '' : 'asc'
      );
    } else {
      setSortBy(value);
      setSortOrder('asc');
    }
  };

  const updateUserAccessLevel = async (data) => {
    // return axiosPutRequest('/users', {}, { data });
    try {
      const resp = await axiosUpdate(
        `${API}/settings/role_update/?id=${data?.id}`,
        { data: { selectedLevel: data?.selectedLevel } },
        {}
      );
      if (resp?.status === 'success') {
        setUpdateConfirm(!updateConfirm);
        toast.success(resp?.data?.msg);
      } else {
        toast.error(resp?.data?.msg);
      }
    } catch (error) {
      console.error('Error updating user access level:', error);
      toast.error('Error updating user access level');
    }
  };
  const { mutate: handleEditUser } = useMutation({
    mutationFn: updateUserAccessLevel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });

  const [index, setIndex] = useState(tabToIndex[tab2] || 0);

  const length = userData?.pages[0]?.data?.total;

  // add width as a property to each column and add value -- if required
  const tableHeaders = userData?.pages[0]?.data?.data?.tableHeaders;
  const tableData = userData?.pages[0]?.data?.data?.tableData;

  const isOneofTabs = myAccountTabs.find((tab) => tab.type === tab2);

  useEffect(() => {
    if (tableData?.length > 0 && selectedRows?.length === tableData?.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedRows, tableData]);

  return (
    <>
      <Tabs
        activeColor={theme[selectedTheme].primary}
        inactiveColor={theme[selectedTheme].tabInactive}
        items={Titletabs}
        paddingWrapper="0"
        wraperBorderWidth="0"
        gapitems="1rem"
        bottomBorderWidth="3px"
        onChange={handleTabs}
        currentTab={index}
        defaultActive={false}
      />
      <div style={{ height: '1.88rem', borderTop: '1px solid #eceff3' }}></div>

      {!isOneofTabs ? (
        <div>Something went wrong</div>
      ) : index === 0 ? (
        <SubscriptionTab orgId={userDetails?.org_id} />
      ) : index === 1 ? (
        <TabContent>
          <HeaderSection>
            <LeftSection>
              <UsersText>Users</UsersText>
              <UserCountWrp>
                <UserCountText>{length} Users</UserCountText>
              </UserCountWrp>
            </LeftSection>
            <RightSection>
              <Searchwpr>
                <Inputwrpr
                  placeholder="Search"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchIcon />
              </Searchwpr>
              <Button
                title="Add User"
                backgroundColor={theme[selectedTheme].primary}
                icon={
                  <AddBlue
                    width="10"
                    height="10"
                    color={theme[selectedTheme].background}
                  />
                }
                btnStyle={addBtnStyle}
                onClick={handleShowAddUser}
              />
              <DashboardPopup
                width={'35vw'}
                open={showAddUser}
                toggler={setShowAddUser}
                popContent={
                  <AddUserPopup
                    toggler={setShowAddUser}
                    heading="Add New User"
                    handleSave={handleSaveAddUser}
                  />
                }
                padding="0"
                borderRadius="0.75rem"
              />
            </RightSection>
          </HeaderSection>
          <CustomTable
            isLoading={isLoading}
            isError={error}
            tableHeaders={tableHeaders}
            tableData={tableData}
            handlePopupClick={handlePopupClick}
            length={length}
            data={userData}
            pageLimit={pageLimit}
            handleLoad={handleLoad}
            infiniteLoading={true}
            handleSortClick={handleSortClick}
            sortBy={sortBy}
            sortOrder={sortOrder}
            selectAll={selectAll}
            setSelectAll={setSelectAll}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            setSingleRowData={setRowData}
            showEditUser={showEditUser}
            setShowEditUser={setShowEditUser}
            tableFor="manage_users"
            setDeleteConfirm={setDeleteConfirm}
          />
        </TabContent>
      ) : index === 4 ? (
        <ProfileSecurity
          userDetails={userDetails}
          setShouldFetchUserDetails={setShouldFetchUserDetails}
        />
      ) : (
        myAccountTabs[index].label + ' tab In Progress'
      )}
      <DashboardPopup
        width={'35vw'}
        open={showEditUser}
        toggler={setShowEditUser}
        popContent={
          <AddUserPopup
            toggler={setShowEditUser}
            heading="Edit User Access"
            handleEdit={handleEditUser}
            type="edit"
            rowData={rowData}
          />
        }
        padding="0"
        borderRadius="0.75rem"
      />
    </>
  );
};

MyAccount.propTypes = {
  handlePopupClick: Proptypes.func,
};

export default MyAccount;
