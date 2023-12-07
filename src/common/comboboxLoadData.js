import axios from "axios";
export const comboboxLoadData = () => {
  /**
   * Comboo Căn hộ
   * @returns
   */
  const loadApartmentComboboxData = async () => {
    let payload = {
      columns: "apartment_id, apartment_name, owner_id, owner_name",
    };
    let module = "apartment";
    return await loadData(module, payload);
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
    loadApartmentComboboxData,
    loadData,
  };
};
