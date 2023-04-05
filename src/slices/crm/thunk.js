import { createAsyncThunk } from "@reduxjs/toolkit";
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

export const getContacts = createAsyncThunk("crm/getContacts", async () => {
  try {
    const arr = [
      {
        _id: "625d3cd5923ccd040209ebf1",
        name: "Michael Morris",
        company: "Syntyce Solutions",
        designation: "NodeJS Developer",
        email: "michaelmorris@velzon.com",
        phone: "484-606-3104",
        lead_score: 361,
        last_contacted: "2022-08-15T00:00:01.991Z",
        image_src: "avatar-6.jpg",
        tags: "active",
      },
      {
        _id: "625d3cd5923ccd040209ebf3",
        name: "Kevin Dawson",
        company: "Meta4Systems",
        designation: "Senoir Developer",
        email: "kevindawson@velzon.com",
        phone: "745-321-9874",
        lead_score: 132,
        last_contacted: "2012-01-01T00:00:02.001Z",
        image_src: "avatar-5.jpg",
        tags: "Active",
      },
      {
        _id: "625d3cd5923ccd040209ebee",
        name: "James Price",
        company: "Themesbrand",
        designation: "Assitant Develope",
        email: "jamesprice@velzon.com",
        phone: "646-276-2274",
        lead_score: 81,
        last_contacted: "2021-07-14T00:00:01.997Z",
        image_src: "avatar-8.jpg",
        tags: "Banned",
      },
      {
        _id: "625d3cd5923ccd040209ebf0",
        name: "Herbert Stokes",
        company: "Themesbrand",
        designation: "Lead Developer",
        email: "herbertstokes@velzon.com",
        phone: "949-791-0614",
        lead_score: 784,
        last_contacted: "1970-01-01T00:00:02.001Z",
        image_src: "avatar-4.jpg",
        tags: "Banned",
      },
      {
        _id: "625d3cd5923ccd040209ebf2",
        name: "Timothy Smith",
        company: "Digitech Galaxy",
        designation: "Mean Stack Developer",
        email: "timothysmith@velzon.com",
        phone: "231-480-8536",
        lead_score: 732,
        last_contacted: "2021-10-21T00:00:01.993Z",
        image_src: "avatar-8.jpg",
        tags: "Active",
      },
      {
        _id: "625d3cd5923ccd040209ebeb",
        name: "Thomas Taylor",
        company: "iTest Factory",
        designation: "UI / UX Designer",
        email: "thomastaylor@velzon.com",
        phone: "580-464-4694",
        lead_score: 236,
        last_contacted: "2022-02-22T00:00:01.994Z",
        image_src: "avatar-9.jpg",
        tags: "Banned",
      },
      {
        _id: "625d3cd5923ccd040209ebec",
        name: "Nancy Martino",
        company: "Force Medicines",
        designation: "PHP Developer",
        email: "nancymartino@velzon.com",
        phone: "786-253-9927",
        lead_score: 197,
        last_contacted: "1970-02-02T00:00:02.004Z",
        image_src: "avatar-1.jpg",
        tags: "Active",
      },
      {
        _id: "625d3cd5923ccd040209ebea",
        name: "Tonya Noble 123",
        company: "Nesta Technologies",
        designation: "Lead Designer / Developer",
        email: "tonyanoble@velzon.com",
        phone: "414-453-5725",
        lead_score: 154,
        last_contacted: "2022-05-09T18:30:00.000Z",
        image_src: "avatar-7.jpg",
        tags: "Active",
      },
      {
        _id: "625d3cd5923ccd040209ebef",
        name: "Mary Cousar",
        company: "Micro Design",
        designation: "Asp.Net Developer",
        email: "marycousar@velzon.com",
        phone: "540-575-0991",
        lead_score: 643,
        last_contacted: "2010-11-05T00:00:02.016Z",
        image_src: "avatar-3.jpg",
        tags: "Banned",
      },
      {
        _id: "625d3cd5923ccd040209ebed",
        name: "Alexis Clarke",
        company: "Digitech Galaxy",
        designation: "Full Stack Developer",
        email: "alexisclarke@velzon.com",
        phone: "515-395-1069",
        lead_score: 369,
        last_contacted: "1970-01-01T00:00:01.996Z",
        image_src: "avatar-6.jpg",
        tags: "Active",
      },
    ];
    // const response = getContactsApi();
    const response = { status: "success", data: arr };
    console.log("get contacts 1", response);
    return response;
  } catch (error) {
    return error;
  }
});

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
