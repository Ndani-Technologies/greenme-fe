import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Navdata = () => {
  const user = useSelector((state) => state.Login.user);
  const history = useNavigate();
  const navigate = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isApps, setIsApps] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isBanchmarking, setIsBanchmarking] = useState(false);
  const [isRecommend, setIsRecommend] = useState(false);
  const [isRecommended, setIsRecommended] = useState(false);
  const [isBaseUi, setIsBaseUi] = useState(false);
  const [isAdvanceUi, setIsAdvanceUi] = useState(false);
  const [isForms, setIsForms] = useState(false);
  const [isTables, setIsTables] = useState(false);
  const [isCharts, setIsCharts] = useState(false);
  const [isIcons, setIsIcons] = useState(false);
  const [isMaps, setIsMaps] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);

  // Apps
  const [isEmail, setEmail] = useState(false);
  const [isSubEmail, setSubEmail] = useState(false);
  const [isEcommerce, setIsEcommerce] = useState(false);
  const [isProjects, setIsProjects] = useState(false);
  const [isTasks, setIsTasks] = useState(false);
  const [isCRM, setIsCRM] = useState(false);
  const [isCrypto, setIsCrypto] = useState(false);
  const [isInvoices, setIsInvoices] = useState(false);
  const [isSupportTickets, setIsSupportTickets] = useState(false);
  const [isNFTMarketplace, setIsNFTMarketplace] = useState(false);
  const [isJobs, setIsJobs] = useState(false);
  const [isJobList, setIsJobList] = useState(false);
  const [isCandidateList, setIsCandidateList] = useState(false);

  // Authentication
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isPasswordCreate, setIsPasswordCreate] = useState(false);
  const [isLockScreen, setIsLockScreen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [isError, setIsError] = useState(false);

  // Pages
  const [isProfile, setIsProfile] = useState(false);
  const [isLanding, setIsLanding] = useState(false);

  // Charts
  const [isApex, setIsApex] = useState(false);

  // Multi Level
  const [isLevel1, setIsLevel1] = useState(false);
  const [isLevel2, setIsLevel2] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  const obj = JSON.parse(sessionStorage.getItem("authUser"));
  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Apps") {
      setIsApps(false);
    }
    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
    if (iscurrentState !== "BaseUi") {
      setIsBaseUi(false);
    }
    if (iscurrentState !== "AdvanceUi") {
      setIsAdvanceUi(false);
    }
    if (iscurrentState !== "Forms") {
      setIsForms(false);
    }
    if (iscurrentState !== "Tables") {
      setIsTables(false);
    }
    if (iscurrentState !== "Charts") {
      setIsCharts(false);
    }
    if (iscurrentState !== "Icons") {
      setIsIcons(false);
    }
    if (iscurrentState !== "Maps") {
      setIsMaps(false);
    }
    if (iscurrentState !== "MuliLevel") {
      setIsMultiLevel(false);
    }
    if (iscurrentState === "Widgets") {
      history("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState !== "Landing") {
      setIsLanding(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isApps,
    isAuth,
    isPages,
    isBaseUi,
    isAdvanceUi,
    isForms,
    isTables,
    isCharts,
    isIcons,
    isMaps,
    isMultiLevel,
    isBanchmarking,
  ]);
  const menuItemsAdmin = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: 1,
      icon: "ri-dashboard-2-line",
      label: "MY Dashboard",
      link: "/",
      disable: true,
    },
    {
      id: "",
      icon: "ri-contacts-book-line",
      label: "Users Management",
      link: "/UsersManagement",
    },
    {
      id: "Benchmarking Admin",
      icon: "ri-compasses-2-line",
      label: "Benchmarking Admin",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsBanchmarking(!isBanchmarking);
        setIscurrentState("Benchmarking");
        updateIconSidebar(e);
      },
      stateVariables: isBanchmarking,
      subItems: [
        {
          id: 1,
          label: "Benchmarking QA",
          link: "/adminbenchmarking/questions",
          parentId: "Benchmarking Admin",
        },
        {
          id: 4,
          label: "Benchmark",
          link: "/adminbenchmarking",
          parentId: "Benchmarking Admin",
        },
      ],
    },
    {
      id: "Recommended Actions Admin",
      icon: "ri-pencil-ruler-2-line",
      label: "Recommended Actions admin",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsRecommended(!isRecommended);
        setIscurrentState("Recommend");
        updateIconSidebar(e);
      },
      stateVariables: isRecommended,
      subItems: [
        {
          id: 1,
          label: "Admin Report",
          link: "/adminreport",
          parentId: "Recommended Actions Admin",
        },
        {
          id: 2,
          label: "Admin Summary",
          link: "/adminSummary",
          parentId: "Recommended Actions Admin",
        },
        {
          id: 3,
          label: "Comparison",
          link: "/actioncomparison",
          parentId: "Recommended Actions Admin",
        },
        {
          id: 4,
          label: "Admin Dashboard",
          link: "/actionadmindashboard",
          parentId: "Recommended Actions Admin",
        },
        {
          id: 5,
          label: "Admin Relation",
          link: "/AdminRelationship",
          parentId: "Recommended Actions Admin",
        },
      ],
    },
    {
      id: 4,
      icon: "ri-stack-line",
      label: "Document sharing",
      link: "/",
      disable: true,
    },
    {
      id: 5,
      icon: "ri-layout-grid-line",
      label: "Collaboration",
      link: "/",
      disable: true,
    },
    {
      id: 6,
      icon: "ri-apps-2-line",
      label: "Discussions",
      link: "/",
      disable: true,
    },
    {
      id: 7,
      icon: "ri-rocket-line",
      label: "Leaderboard",
      link: "/",
      disable: true,
    },
    {
      id: 8,
      icon: "ri-pie-chart-line",
      label: "Reports",
      link: "/",
      disable: true,
    },
  ];
  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: 1,
      icon: "ri-dashboard-2-line",
      label: "MY Dashboard",
      link: "/",
      disable: true,
    },

    {
      id: "Benchmarking",
      icon: "ri-compasses-2-line",
      label: "Benchmarking",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsApps(!isApps);
        setIscurrentState("Apps");
        updateIconSidebar(e);
      },
      stateVariables: isApps,
      subItems: [
        {
          id: 1,
          label: "Dashboard",
          link: "/benchmarking",
          parentId: "Benchmarking",
        },
      ],
    },

    {
      id: "Recommended Actions",
      icon: "ri-pencil-ruler-2-line",
      label: "Recommended Actions",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsRecommend(!isRecommend);
        setIscurrentState("Recommend");
        updateIconSidebar(e);
      },
      stateVariables: isRecommend,
      // subItems: [
      //   {
      //     id: 1,
      //     label: "Report",
      //     link: "/userreport",
      //     parentId: "Recommended Actions",
      //   },
      //   {
      //     id: 2,
      //     label: "User Summary",
      //     link: "/usersummary",
      //     parentId: "Recommended Actions",
      //   },
      //   {
      //     id: 3,
      //     label: "User Details",
      //     link: "/actionuserdetail",
      //     parentId: "Recommended Actions",
      //   },
      // ],
    },

    {
      id: 4,
      icon: "ri-stack-line",
      label: "Document sharing",
      link: "/",
      disable: true,
    },
    {
      id: 5,
      icon: "ri-layout-grid-line",
      label: "Collaboration",
      link: "/",
      disable: true,
    },
    {
      id: 6,
      icon: "ri-apps-2-line",
      label: "Discussions",
      link: "/",
      disable: true,
    },
    {
      id: 7,
      icon: "ri-rocket-line",
      label: "Leaderboard",
      link: "/",
      disable: true,
    },
    {
      id: 8,
      icon: "ri-pie-chart-line",
      label: "Reports",
      link: "/",
      disable: true,
    },
  ];
  console.log("user role", user?.role, user);
  return (
    <React.Fragment>
      {obj?.role?.title == "admin" ? menuItemsAdmin : menuItems}
    </React.Fragment>
  );
};
export default Navdata;
