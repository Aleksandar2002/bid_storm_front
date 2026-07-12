/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import {
  type EntityData,
  getEntityTableData,
} from "../Dashboard/tableData/allEntities.tsx";
import GenericForm from "../../shared/components/generics/GenericForm";
import api from "../../api/axios";

const DashboardForm = () => {
  const [searchParams] = useSearchParams();
  const method = searchParams.get("method");
  const [entityData, setEntityData] = useState<EntityData<any, any> | null>(
    null,
  );

  const [defaultData, setDefaultData] = useState();

  useEffect(() => {
    const init = async () => {
      const entityName = searchParams.get("entity");

      if (entityName) {
        const data = getEntityTableData(entityName);
        if (data?.createOrUpdateForm) {
          setEntityData(data);

          const id = searchParams.get("id");

          if (id && data) {
            const resp = await api.get(data.endpoints.get + "/" + id);
            console.log(resp);
            if (resp.status == 200) {
              if (data.createOrUpdateForm.mapOnFindResponse) {
                const entityFormData =
                  data.createOrUpdateForm.mapOnFindResponse(resp.data);
                setDefaultData(entityFormData);
              }
              setDefaultData(resp.data);
            }
          }
          return;
        }
        setEntityData(null);
      }
    };
    init();
  }, [searchParams]);

  return (
    <div className="container dashboard-form">
      {entityData && entityData.createOrUpdateForm && method ? (
        <div className="w-full flexcol">
          <h2>
            {entityData.title} {method == "create" ? "insert" : "update"} form
          </h2>
          <GenericForm
            key={defaultData}
            formClass="w-full"
            validation={entityData.createOrUpdateForm.validation}
            fields={entityData.createOrUpdateForm.fields}
            defaultValues={defaultData}
            method={method == "create" ? "Post" : "Put"}
            endpoints={{
              default: entityData.endpoints.default ?? entityData.endpoints.get,
              add: entityData.endpoints.create,
              update: entityData.endpoints.update,
            }}
          />
        </div>
      ) : (
        "Invalid data in configuration"
      )}
    </div>
  );
};

export default DashboardForm;
