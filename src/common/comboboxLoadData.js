import axios from "axios";
export const comboboxLoadData = () => {
  /**
   * Comboo Căn hộ
   * @returns
   */
  const loadApartmentData = async () => {
    let payload = {
      columns: "apartment_id, apartment_name, owner_id, owner_name",
    };
    let module = "apartment";
    return await loadData(module, payload);
  };
  /**
   * Comboo Bộ hồ sơ
   * @returns
   */
  const loadContractGroupData = async () => {
    let payload = {
      columns:
        "contract_group_id, contract_group_name, owner_id, owner_name, apartment_name, apartment_id",
    };
    let module = "contractgroup";
    return await loadData(module, payload);
  };
  /**
   * Comboo Căn hộ
   * @returns
   */
  const loadClientData = async () => {
    let payload = {
      columns: "client_id, client_name, paper_number",
    };
    let module = "client";
    return await loadData(module, payload);
  };

  /**
   * Comboo Chủ nhà
   * @returns
   */
  const loadOwnerData = async () => {
    let payload = {
      columns: "owner_id, owner_name, paper_number, birthdate",
    };
    let module = "owner";
    return await loadData(module, payload);
  };

  /**
   * Combo tòa nhà
   * @returns
   */
  const loadBuildingData = async () => {
    let payload = {
      columns: "building_id, building_name, building_address",
    };
    let module = "building";
    return await loadData(module, payload);
  };

  /**
   * Combo tòa nhà
   * @returns
   */
  const loadProvinceData = async () => {
    let payload = {
      columns: "province_code, province_name, province_full_name",
    };
    let module = "province";
    return await loadData(module, payload);
  };

  const loadDistrictData = async (province_code) => {
    let payload = {
      columns: "district_code, district_name, district_full_name",
    };
    let module = "district";
    // Nếu có mã TP thì mới load
    if (province_code) {
      payload.filter = [
        {
          field: "province_code",
          value: province_code,
          op: "=",
        },
      ];
      return await loadData(module, payload);
    }
  };

  const loadWardData = async (district_code) => {
    let payload = {
      columns: "ward_code, ward_name, ward_full_name",
    };
    let module = "ward";
    // Nếu có mã phường thì mới load
    if (district_code) {
      payload.filter = [
        {
          field: "district_code",
          value: district_code,
          op: "=",
        },
      ];
      return await loadData(module, payload);
    }
  };

  /**
   * Gọi api
   * @param {*} module
   * @param {*} payload
   */
  const loadData = async (module, payload) => {
    payload.take = -1;
    payload.skip = 0;
    let data = [];
    try {
      let res = await axios.post(`${module}/combobox`, payload);
      data = res.data;
    } catch (error) {
      console.log(error);
    }
    return data;
  };

  return {
    loadApartmentData,
    loadContractGroupData,
    loadClientData,
    loadOwnerData,
    loadData,
    loadBuildingData,
    loadProvinceData,
    loadDistrictData,
    loadWardData,
  };
};
