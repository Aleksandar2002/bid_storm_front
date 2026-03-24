import { useEffect, useState } from "react";
import GenericForm from "../../shared/components/generics/GenericForm";
import { fields, schema, type FormType } from "./formData/profileForm";
import { getUserData } from "../../app/services/authService";
import { useToast } from "../../app/stores/toastMessageStore";

const Profile = () => {
  const [userSettings, setUserSettings] = useState<FormType>();
  const [id, setId] = useState<number>();

  useEffect(() => {
    const fetchUserData = async () => {
      const resp = await getUserData();
      setId(resp.data.id);
      setUserSettings(resp.data);
    };

    fetchUserData();
  }, []);

  const { setSuccessToast } = useToast();

  const handleSuccess = () => {
    setSuccessToast("Successfully saved");
  };

  return (
    <div className="container profile">
      <div className="form-wrapper">
        {userSettings && id && (
          <GenericForm
            key={id}
            title="Profile settings"
            fields={fields}
            validation={schema}
            isIndependent={false}
            isFullBtnsWidth={true}
            submitBtnText="Save changes"
            defaultValues={userSettings}
            endpoints={{
              update: `/users/saveProfileData/${id}`,
            }}
            shouldResetAfterSubmit={false}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
