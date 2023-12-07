export const ContractGroupDetailData = () => {
  const columns = [
    {
      width: 150,
      name: "Mã HĐ",
      dataField: "payment_batch",
    },
    {
      width: 300,
      name: "Tên căn hộ",
      dataField: "amount",
    },
    {
      autoRezie: true,
      width: 200,
      name: "Bên cho thuê",
      dataField: "note",
    },
    {
      width: 300,
      name: "Bên thuê/Môi giới",
      dataField: "start_date",
      align: "center",
      type: "date",
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
      width: 250,
      name: "Kiểu hợp đồng",
      dataField: "status",
    },
  ];

  return {
    columns,
  };
};
