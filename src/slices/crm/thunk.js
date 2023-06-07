import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import {
  getContacts as getContactsApi,
  getCompanies as getCompaniesApi,
  getDeals as getDealsApi,
  getLeads as getLeadsApi,
  addNewCompanies as addNewCompaniesApi,
  updateCompanies as updateCompaniesApi,
  deleteCompanies as deleteCompaniesApi,
  addNewContact as addNewContactApi,
  updateContact as updateContactApi,
  deleteContact as deleteContactApi,
  addNewLead as addNewLeadApi,
  updateLead as updateLeadApi,
  deleteLead as deleteLeadApi,
} from "../../helpers/fakebackend_helper";

export const getContacts = createAsyncThunk("crm/getContacts", async (arr) => {
  try {
    // const arr = [
    //   {
    //     _id: "625d3cd5923ccd040209ebf1",
    //     name: "Michael Morris",
    //     company: "Syntyce Solutions",
    //     designation: "NodeJS Developer",
    //     email: "michaelmorris@velzon.com",
    //     phone: "484-606-3104",
    //     lead_score: "Sweden",
    //     last_contacted: "2022-08-15T00:00:01.991Z",
    //     image_src: "avatar-6.jpg",
    //     tags: "active",
    //   },
    //   {
    //     _id: "625d3cd5923ccd040209ebf3",
    //     name: "Kevin Dawson",
    //     company: "Meta4Systems",
    //     designation: "Senoir Developer",
    //     email: "kevindawson@velzon.com",
    //     phone: "745-321-9874",
    //     lead_score: "Kenya",
    //     last_contacted: "2012-01-01T00:00:02.001Z",
    //     image_src: "avatar-5.jpg",
    //     tags: "Active",
    //   },
    //   {
    //     _id: "625d3cd5923ccd040209ebee",
    //     name: "James Price",
    //     company: "Themesbrand",
    //     designation: "Assitant Develope",
    //     email: "jamesprice@velzon.com",
    //     phone: "646-276-2274",
    //     lead_score: "Nigeria",
    //     last_contacted: "2021-07-14T00:00:01.997Z",
    //     image_src: "avatar-8.jpg",
    //     tags: "Banned",
    //   },
    //   {
    //     _id: "625d3cd5923ccd040209ebf0",
    //     name: "Herbert Stokes",
    //     company: "Themesbrand",
    //     designation: "Lead Developer",
    //     email: "herbertstokes@velzon.com",
    //     phone: "949-791-0614",
    //     lead_score: "Malaysia",
    //     last_contacted: "1970-01-01T00:00:02.001Z",
    //     image_src: "avatar-4.jpg",
    //     tags: "Banned",
    //   },
    //   {
    //     _id: "625d3cd5923ccd040209ebf2",
    //     name: "Timothy Smith",
    //     company: "Digitech Galaxy",
    //     designation: "Mean Stack Developer",
    //     email: "timothysmith@velzon.com",
    //     phone: "231-480-8536",
    //     lead_score: "Japan",
    //     last_contacted: "2021-10-21T00:00:01.993Z",
    //     image_src: "avatar-8.jpg",
    //     tags: "Active",
    //   },
    //   {
    //     _id: "625d3cd5923ccd040209ebeb",
    //     name: "Thomas Taylor",
    //     company: "iTest Factory",
    //     designation: "UI / UX Designer",
    //     email: "thomastaylor@velzon.com",
    //     phone: "580-464-4694",
    //     lead_score: "Poland",
    //     last_contacted: "2022-02-22T00:00:01.994Z",
    //     image_src: "avatar-9.jpg",
    //     tags: "Banned",
    //   },
    //   {
    //     _id: "625d3cd5923ccd040209ebec",
    //     name: "Nancy Martino",
    //     company: "Force Medicines",
    //     designation: "PHP Developer",
    //     email: "nancymartino@velzon.com",
    //     phone: "786-253-9927",
    //     lead_score: "UK",
    //     last_contacted: "1970-02-02T00:00:02.004Z",
    //     image_src: "avatar-1.jpg",
    //     tags: "Active",
    //   },
    //   {
    //     _id: "625d3cd5923ccd040209ebea",
    //     name: "Tonya Noble 123",
    //     company: "Nesta Technologies",
    //     designation: "Lead Designer / Developer",
    //     email: "tonyanoble@velzon.com",
    //     phone: "414-453-5725",
    //     lead_score: "Russia",
    //     last_contacted: "2022-05-09T18:30:00.000Z",
    //     image_src: "avatar-7.jpg",
    //     tags: "Active",
    //   },
    //   {
    //     _id: "625d3cd5923ccd040209ebef",
    //     name: "Mary Cousar",
    //     company: "Micro Design",
    //     designation: "Asp.Net Developer",
    //     email: "marycousar@velzon.com",
    //     phone: "540-575-0991",
    //     lead_score: "Poland",
    //     last_contacted: "2010-11-05T00:00:02.016Z",
    //     image_src: "avatar-3.jpg",
    //     tags: "Banned",
    //   },
    //   {
    //     _id: "625d3cd5923ccd040209ebed",
    //     name: "Alexis Clarke",
    //     company: "Digitech Galaxy",
    //     designation: "Full Stack Developer",
    //     email: "alexisclarke@velzon.com",
    //     phone: "515-395-1069",
    //     lead_score: "Japan",
    //     last_contacted: "1970-01-01T00:00:01.996Z",
    //     image_src: "avatar-6.jpg",
    //     tags: "Active",
    //   },
    // ];
    // const response = getContactsApi();
    const response = { status: "success", data: arr };

    return response;
  } catch (error) {
    return error;
  }
});

//ADMIN ACTIONS CRUD FUNCTIONALITY

export const getAllAdminActions = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_RA_URL}actionsteps`);
    let data;

    data = res.map((value) => {
      return {
        title: value?.title,
        category: value?.categoryId?.title,
        stat: value?.status ? "true" : "false",
        potential: value?.potentialId?.title,
        cost: value?.costId?.title,
        timescale: value?.timescaleId?.title,
        ...value,
      };
    });

    console.log(data, "DATA IN");

    return data;
  } catch (err) {
    console.log("Error in getting data", err);
  }
};

export const createAdminActions = async (data) => {
  console.log(data, "CREATE DATA");

  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_RA_URL}actionsteps/${id}`,

      data
    );
    if (res !== undefined) {
      const createdResp = {
        title: res?.title,
        category: res?.categoryId?.title,
        stat: res?.status ? "true" : "false",
        potential: res?.potentialId?.title,
        cost: res?.costId?.title,
        timescale: res?.timescaleId?.title,
        ...res,
      };
      console.log(res, "CREATE RES", createdResp);
      return createdResp;
    }
    return res;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const updatedAdminActions = async (data, id) => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_RA_URL}actionsteps/${id}`,

      data
    );
    if (res !== undefined) {
      const updatedResp = {
        title: res?.title,
        category: res?.categoryId?.title,
        stat: res?.status ? "true" : "false",
        potential: res?.potentialId?.title,
        cost: res?.costId?.title,
        timescale: res?.timescaleId?.title,

        ...res,
      };
      return updatedResp;
    }
    return res;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const deleteAdminAction = async (id) => {
  try {
    // const res = await axios.delete(
    //   `http://192.168.137.1:5002/api/v1/ra/resourceLink/${id}`
    // );
    const res = await axios.delete(
      `${process.env.REACT_APP_RA_URL}actionsteps/${id}`
    );
    return res;
  } catch (error) {
    toast.error("Unable to Delete");
    console.log(error);
  }
};

//ADMIN ACTIONS CRUD FUNCTIONALITY
export const getAllAdminResources = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_RA_URL}resourceLink`);
    // const res = await axios.get(
    //   `http://192.168.137.1:5002/api/v1/ra/resourceLink`
    // );
    return res;
  } catch (err) {
    console.log("Error in getting data", err);
  }
};

export const createAdminResources = async (data, category) => {
  try {
    // const res = await axios.post(
    //   `http://192.168.137.1:5002/api/v1/ra/resourceLink`,
    //   data
    // );
    const res = await axios.post(
      `${process.env.REACT_APP_RA_URL}resourceLink`,
      data
    );
    return res;
  } catch (error) {
    console.error(error);
    toast.error("link already exist");
    return undefined;
  }
};

export const updateAdminResources = async (id, data) => {
  try {
    // const res = await axios.patch(
    //   `http://192.168.137.1:5002/api/v1/ra/resourceLink`,
    //   data
    // );
    const res = await axios.patch(
      `${process.env.REACT_APP_RA_URL}resourceLink/${id}`,
      data
    );
    return res;
  } catch (error) {
    console.log("Unable to Add", error);
  }
};

export const deleteAdminResources = async (id) => {
  try {
    // const res = await axios.delete(
    //   `http://192.168.137.1:5002/api/v1/ra/resourceLink/${id}`
    // );
    const res = await axios.delete(
      `${process.env.REACT_APP_RA_URL}resourceLink/${id}`
    );
    return res;
  } catch (error) {
    toast.error("Unable to Delete");
    console.log(error);
  }
};
//ADMIN STEPS CRUD FUNCTIONALITY
export const getAllAdminSteps = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_RA_URL}steps`);
    // const res = await axios.get(
    //   `http://localhost:5002/api/v1/ra/steps`
    // );
    console.log("resp steps", res);
    return res;
  } catch (err) {
    console.log("Error in getting data", err);
  }
};

export const createAdminStep = async (data, category) => {
  try {
    // const res = await axios.post(
    //   `http://localhost:5002/api/v1/ra/steps`,
    //   data
    // );
    const res = await axios.post(`${process.env.REACT_APP_RA_URL}steps`, data);
    return res;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const updateAdminStep = async (id, data) => {
  try {
    // const res = await axios.patch(
    //   `http://localhost:5002/api/v1/ra/steps/${id}`,
    //   data
    // );
    const res = await axios.patch(
      `${process.env.REACT_APP_RA_URL}steps/${id}`,
      data
    );
    return res;
  } catch (error) {
    console.log("Unable to Add", error);
  }
};

export const deleteAdminStep = async (id) => {
  try {
    console.log("id", id);
    // const res = await axios.delete(
    //   `http://localhost:5002/api/v1/ra/steps/${id}`
    // );
    const res = await axios.delete(
      `${process.env.REACT_APP_RA_URL}steps/${id}`
    );
    return res;
  } catch (error) {
    toast.error("Unable to Delete");
    console.log(error);
  }
};

//TIME SCALE CRUD FUNCTIONALITY

export const getAdminTimeScale = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_RA_URL}timescales`);
    return res;
  } catch (error) {
    console.log("Cannot get Time Scale", error);
  }
};

export const createAdminTimeScale = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_RA_URL}timescales`,
      data
    );
    return res;
  } catch (error) {
    console.log("Cannot get Time Scale", error);
  }
};

export const updateAdminTimeScale = async (id, data) => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_RA_URL}timescales/${id}`,
      data
    );
    return res;
  } catch (error) {
    console.log("Unable to Add", error);
  }
};

export const deleteAdminTimeScale = async (id) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_RA_URL}timescales/${id}`
    );
    return res;
  } catch (error) {
    toast.error("Unable to Delete");
    console.log(error);
  }
};

//COSTS CRUD FUNCTIONALITY

export const getAdminCosts = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_RA_URL}costs`);
    return res;
  } catch (error) {
    console.log("Cannot get Time Scale", error);
  }
};

export const createAdminCosts = async (data) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_RA_URL}costs`, data);
    return res;
  } catch (error) {
    console.log("Cannot get Time Scale", error);
  }
};

export const updateAdminCosts = async (id, data) => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_RA_URL}costs/${id}`,
      data
    );
    return res;
  } catch (error) {
    console.log("Unable to Add", error);
  }
};

export const deleteAdminCosts = async (id) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_RA_URL}costs/${id}`
    );
    return res;
  } catch (error) {
    toast.error("Unable to Delete");
    console.log(error);
  }
};

//POTENTIAL CRUD FUNCTIONALITY

export const getAdminPotentials = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_RA_URL}potentials`);
    return res;
  } catch (error) {
    console.log("Cannot get Time Scale", error);
  }
};

export const createAdminPotential = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_RA_URL}potentials`,
      data
    );
    return res;
  } catch (error) {
    console.log("Cannot get Time Scale", error);
  }
};

export const updateAdminPotential = async (id, data) => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_RA_URL}potentials/${id}`,
      data
    );
    return res;
  } catch (error) {
    console.log("Unable to Add", error);
  }
};

export const deleteAdminPotential = async (id) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_RA_URL}potentials/${id}`
    );
    return res;
  } catch (error) {
    toast.error("Unable to Delete");
    console.log(error);
  }
};

//STATUS CRUD FUNCTIONALITY

export const getAdminStatus = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_RA_URL}status`);
    return res;
  } catch (error) {
    console.log("Cannot get Time Scale", error);
  }
};

export const createAdminStatus = async (data) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_RA_URL}status`, data);
    return res;
  } catch (error) {
    console.log("Cannot get Time Scale", error);
  }
};

export const updateAdminStatus = async (id, data) => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_RA_URL}status/${id}`,
      data
    );
    return res;
  } catch (error) {
    console.log("Unable to Add", error);
  }
};

export const deleteAdminStatus = async (id) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_RA_URL}status/${id}`
    );
    return res;
  } catch (error) {
    toast.error("Unable to Delete");
    console.log(error);
  }
};

//ADMIN RELATIONSHIP CRUD FUNCTIONALITY

export const getAdminRelationships = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_RA_URL}answer_relationship`
    );
    return res;
  } catch (error) {
    console.log("Cannot get Time Scale", error);
  }
};

export const createAdminRelationships = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_RA_URL}answer_relationship`,
      data
    );
    return res;
  } catch (error) {
    console.log("Cannot get Time Scale", error);
  }
};

export const updateAdminRelationships = async (id, data) => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_RA_URL}answer_relationship/${id}`,
      data
    );
    return res;
  } catch (error) {
    console.log("Unable to Add", error);
  }
};

export const deleteAdminRelationships = async (id) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_RA_URL}answer_relationship/${id}`
    );
    return res;
  } catch (error) {
    toast.error("Unable to Delete");
    console.log(error);
  }
};

//ADMIN CATEGORIES CRUD FUNCTIONALITY

export const getAdminCategories = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_RA_URL}categories`);
    return res;
  } catch (error) {
    console.log("Cannot get Time Scale", error);
  }
};

export const createAdminCategories = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_RA_URL}categories`,
      data
    );
    return res;
  } catch (error) {
    console.log("Cannot get Time Scale", error);
  }
};

export const updateAdminCategories = async (id, data) => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_RA_URL}categories/${id}`,
      data
    );
    return res;
  } catch (error) {
    console.log("Unable to Add", error);
  }
};

export const deleteAdminCategories = async (id) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_RA_URL}categories/${id}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCompanies = createAsyncThunk("crm/getCompanies", async () => {
  try {
    const response = getCompaniesApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const addNewCompanies = createAsyncThunk(
  "crm/addNewCompanies",
  async (companies) => {
    try {
      const response = addNewCompaniesApi(companies);
      toast.success("Company Added Successfully", { autoClose: 3000 });
      return response;
    } catch (error) {
      toast.error("Company Added Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const updateCompanies = createAsyncThunk(
  "crm/updateCompanies",
  async (companies) => {
    try {
      const response = updateCompaniesApi(companies);
      toast.success("Company Updated Successfully", { autoClose: 3000 });
      return response;
    } catch (error) {
      toast.error("Company Updated Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const deleteCompanies = createAsyncThunk(
  "crm/deleteCompanies",
  async (companies) => {
    try {
      const response = deleteCompaniesApi(companies);
      toast.success("Company Deleted Successfully", { autoClose: 3000 });
      return { companies, ...response };
    } catch (error) {
      toast.error("Company Deleted Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const addNewContact = createAsyncThunk(
  "crm/addNewContact",
  async (contact) => {
    try {
      const response = addNewContactApi(contact);
      toast.success("Contact Added Successfully", { autoClose: 3000 });
      return response;
    } catch (error) {
      toast.error("Contact Added Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const updateContact = createAsyncThunk(
  "crm/updateContact",
  async (contact) => {
    try {
      const response = updateContactApi(contact);
      toast.success("Contact Updated Successfully", { autoClose: 3000 });
      return response;
    } catch (error) {
      toast.error("Contact Updated Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const deleteContact = createAsyncThunk(
  "crm/deleteContact",
  async (contact) => {
    try {
      const response = deleteContactApi(contact);
      toast.success("Contact Deleted Successfully", { autoClose: 3000 });
      return { contact, ...response };
    } catch (error) {
      toast.error("Contact Deleted Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const getLeads = createAsyncThunk("crm/getLeads", async () => {
  try {
    const response = getLeadsApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const addNewLead = createAsyncThunk("crm/addNewLead", async (lead) => {
  try {
    const response = addNewLeadApi(lead);
    toast.success("Lead Added Successfully", { autoClose: 3000 });
    return response;
  } catch (error) {
    toast.error("Lead Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const updateLead = createAsyncThunk("crm/updateLead", async (lead) => {
  try {
    const response = updateLeadApi(lead);
    toast.success("Lead Updated Successfully", { autoClose: 3000 });
    return response;
  } catch (error) {
    toast.error("Lead Updated Failed", { autoClose: 3000 });
    return error;
  }
});

export const deleteLead = createAsyncThunk("crm/deleteLead", async (leads) => {
  try {
    const response = deleteLeadApi(leads);
    toast.success("Lead Deleted Successfully", { autoClose: 3000 });
    return { leads, ...response };
  } catch (error) {
    toast.error("Lead Deleted Failed", { autoClose: 3000 });
    return error;
  }
});

export const getDeals = createAsyncThunk("crm/getDeals", async () => {
  try {
    const response = getDealsApi();
    return response;
  } catch (error) {
    return error;
  }
});
