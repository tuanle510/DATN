export const comboboxColumns = () => {
  /**
   * Khách hàng
   */
  const clientColumns = [
    {
      width: 200,
      name: "Tên khách hàng",
      dataField: "client_name",
      align: "left",
    },
    {
      name: "CMT/CCCD",
      dataField: "paper_number",
      align: "left",
    },
  ];
  /**
   * Bộ hợp đồng
   */
  const contractGroupColumns = [
    {
      width: 150,
      name: "Bộ hợp đồng",
      dataField: "contract_group_name",
      align: "left",
    },
    {
      width: 150,
      name: "Tên căn hộ",
      dataField: "apartment_name",
      align: "left",
    },
    {
      name: "Tên chủ nhà",
      dataField: "owner_name",
      align: "left",
    },
  ];

  const apartmentColumns = [
    {
      width: 200,
      name: "Tên Căn hộ",
      dataField: "apartment_name",
      align: "left",
    },
    {
      name: "Tên Chủ nhà",
      dataField: "owner_name",
      align: "left",
    },
  ];

  const ownerColumns = [
    {
      width: 200,
      name: "Tên Chủ nhà",
      dataField: "owner_name",
      align: "left",
    },
    {
      width: 150,
      name: "CMT/CCCD",
      dataField: "paper_number",
      align: "left",
    },
    {
      name: "Ngày sinh",
      dataField: "birthdate",
      align: "center",
      type: "date",
    },
  ];

  return {
    clientColumns,
    contractGroupColumns,
    apartmentColumns,
    ownerColumns,
  };
};
