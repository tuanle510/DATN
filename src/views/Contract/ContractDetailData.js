export const ContractDetailData = () => {
  const columns = [
    {
      width: 100,
      name: "Đợt",
      dataField: "payment_batch",
      align: "left",
    },
    {
      width: 150,
      name: "Số tiền",
      dataField: "amount",
      align: "right",
      type: "currency",
    },
    {
      autoRezie: true,
      width: 150,
      name: "Ghi chú",
      dataField: "note",
    },
    {
      width: 100,
      name: "Ngày bắt đầu",
      dataField: "start_date",
      align: "center",
      type: "date",
    },
    {
      width: 100,
      name: "Ngày kết thúc",
      dataField: "end_date",
      align: "center",
      type: "date",
    },
    {
      width: 100,
      name: "Ngày dự trả",
      dataField: "expected_payment_date",
      align: "center",
      type: "date",
    },
    {
      width: 100,
      name: "Trạng thái",
      dataField: "status",
    },
    {
      width: 150,
      name: "Người gửi",
      dataField: "sender",
    },
    {
      width: 150,
      name: "Người nhận",
      dataField: "receiver",
    },
  ];

  return {
    columns,
  };
};
