export const ContractGroupDetailData = () => {
  const columns = [
    {
      width: 200,
      name: "Tên căn hộ",
      dataField: "apartment_name",
    },
    {
      autoRezie: true,
      width: 200,
      name: "Bên cho thuê",
      dataField: "lessor_name",
    },
    {
      width: 250,
      name: "Bên thuê/Môi giới",
      dataField: "renter_name",
    },
    {
      width: 150,
      name: "Ngày bắt đầu",
      dataField: "start_date",
      align: "center",
      type: "date",
    },
    {
      width: 150,
      name: "Ngày kết thúc",
      dataField: "end_date",
      align: "center",
      type: "date",
    },
    {
      width: 150,
      name: "Trạng thái",
      dataField: "status",
    },
    {
      name: "Kiểu hợp đồng",
      dataField: "contract_type",
    },
  ];

  return {
    columns,
  };
};
