/* eslint-disable @typescript-eslint/no-explicit-any */
import type z from "zod";
import {
  auctionSearchFields,
  auctionSearchSchema,
} from "./Entities/Auctions/auctionSearchData";
import {
  auctionCols,
  auctionsFindMap,
  auctionsTableMap,
} from "./Entities/Auctions/auctionTableData";
import { categoryCols } from "./Entities/categoryTableData";
import type {
  IFormField,
  ISelectOption,
} from "../../../shared/components/form/IFormFIeld";
import { auctionSortingOptions } from "../../AuctionsView/data/sortingOptions";
import {
  keywordScheme,
  keywordSearch,
} from "./Entities/SharedData/keywordSearch";
import { formFields, schema } from "../../AddAuction/addAuctionData";
import type {
  TableRestrictions,
  TableColumn,
} from "../../../shared/components/generics/data/genericTableTypes";
import { roleCols } from "./Entities/roleTableData";
import { countryCols } from "./Entities/countryTableData";
import { auditLogCols } from "./Entities/AuditLogs/tableData";
import {
  auditLogSearchFields,
  auditLogSearchSchema,
} from "./Entities/AuditLogs/searchData";
import {
  nameEntitySchema,
  nameFields,
} from "./Entities/SharedData/nameCrudForm";
import { placeCols } from "./Entities/Places/placeTableData";
import {
  placeEntitySchema,
  placeFields,
} from "./Entities/Places/placeFormData";
import type { Endpoints } from "../../../types/Endpoints";
import type { ReactNode } from "react";
import { userCols } from "./Entities/Users/tableData";
import {
  userSearchFields,
  userSearchSchema,
} from "./Entities/Users/searchData";

import { UserActions } from "./Entities/Users/tableActions";

export const getEntityTableData = (entity: string) => {
  if (entitiesData[entity]) {
    return entitiesData[entity];
  }
};

export const getEntityFormData = (entity: string) => {
  if (entitiesData[entity]) {
    return entitiesData[entity].createOrUpdateForm;
  }
};

export type EntityData<T, TSearchSchema extends z.ZodObject<any>> = {
  cols: Array<TableColumn<T>>;
  endpoints: Endpoints;
  mapDataOnResponse?: (data: any) => T[];
  title?: string;
  searchValidation?: TSearchSchema;
  searchFields?: IFormField<z.infer<TSearchSchema>>[];
  sortingOptions?: ISelectOption[];
  createOrUpdateForm?: CrudForm;
  restrictions?: TableRestrictions;
  hideInsert?: boolean;
  customActions?: (row: T) => ReactNode;
};

export type CrudForm = {
  validation: any;
  fields: any;
  mapOnFindResponse?: (data: any) => any;
};

const entitiesData: Record<string, EntityData<any, any>> = {
  auction: {
    cols: auctionCols,
    endpoints: {
      get: "auctions",
    },
    mapDataOnResponse: auctionsTableMap,
    title: "Auctions",
    searchFields: auctionSearchFields,
    searchValidation: auctionSearchSchema,
    sortingOptions: auctionSortingOptions,
    createOrUpdateForm: {
      validation: schema,
      fields: formFields,
      mapOnFindResponse: auctionsFindMap,
    },
  },
  country: {
    cols: countryCols,
    endpoints: {
      get: "countries",
    },
    title: "Countries",
    searchFields: keywordSearch,
    searchValidation: keywordScheme,
    createOrUpdateForm: {
      validation: nameEntitySchema,
      fields: nameFields,
    },
  },
  place: {
    cols: placeCols,
    endpoints: {
      get: "places",
    },
    title: "Places",
    searchFields: keywordSearch,
    searchValidation: keywordScheme,
    createOrUpdateForm: {
      validation: placeEntitySchema,
      fields: placeFields,
    },
  },
  productcategory: {
    cols: categoryCols,
    endpoints: {
      get: "categories",
    },
    title: "Categories",
    searchFields: keywordSearch,
    searchValidation: keywordScheme,
    createOrUpdateForm: {
      validation: nameEntitySchema,
      fields: nameFields,
    },
  },
  role: {
    cols: roleCols,
    endpoints: {
      get: "roles",
    },
    title: "Roles",
    searchFields: keywordSearch,
    searchValidation: keywordScheme,
  },
  auditlog: {
    cols: auditLogCols,
    endpoints: {
      get: "auditLogs",
    },
    title: "Audit logs",
    searchFields: auditLogSearchFields,
    searchValidation: auditLogSearchSchema,
    restrictions: {
      hideDelete: true,
      hideUpdate: true,
    },
    hideInsert: true,
  },
  user: {
    cols: userCols,
    endpoints: {
      get: "users",
    },
    title: "Users",
    searchFields: userSearchFields,
    searchValidation: userSearchSchema,
    restrictions: {
      hideDelete: true,
      hideUpdate: true,
    },
    hideInsert: true,
    customActions: UserActions,
  },
};
