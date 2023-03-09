import SoftSelect from "components/SoftSelect";
import { useSoftUIController } from "context";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { errorService } from "services/respService/errorService";
import { successService } from "services/respService/successService";
import { getAllTenant } from "services/tenantService";

export default function TenantId({ setValue, errors, selectedId }) {
  const [controller] = useSoftUIController();
  const { userData, userId, role } = controller;

  useEffect(() => {
    if (userId) {
      getAllTenantList();
    }
  }, [userId]);

  const tenantData = [
    {
      label: userData.companyName,
      value: userData._id,
    },
  ];

  const [allTenantList, setAllTenantList] = useState([]);

  const getAllTenantList = () => {
    getAllTenant().then((resp) => {
      if (successService(resp)) {
        setAllTenantList(resp.responseData.data);
      } else {
        errorService({ resp });
      }
    });
  };

  const getTenantArrList = () => {
    if (role === "admin") {
      return allTenantList?.map((item) => ({ ...item, label: item.name, value: item._id }));
    } else {
      return tenantData;
    }
  };

  useEffect(() => {
    if (role !== "admin" && userData) {
      setValue("tenantId", userData._id, { shouldValidate: true });
    }
  }, [role, userData]);

  if (role === "admin") {
    return (
      <SoftSelect
        options={getTenantArrList()}
        key={selectedId}
        handleChange={(val) => {
          setValue("tenantId", val._id, { shouldValidate: true });
        }}
        error={errors?.tenantId}
        isDisabled={false}
        placeholder="Select Tenant"
      />
    );
  } else {
    return (
      <SoftSelect
        options={getTenantArrList()}
        key={selectedId}
        value={tenantData}
        error={errors?.tenantId}
        isDisabled={true}
        placeholder="Select Tenant"
      />
    );
  }
}

TenantId.propTypes = {
  errors: PropTypes.any,
  setValue: PropTypes.any,
  selectedId: PropTypes.number,
};
