export const ContractDetailData = () => {
  const columns = [
    {
      width: 120,
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
      width: 120,
      name: "Ngày bắt đầu",
      dataField: "start_date",
      align: "center",
      type: "date",
    },
    {
      width: 120,
      name: "Ngày dự trả",
      dataField: "expected_payment_date",
      align: "center",
      type: "date",
    },
    {
      width: 120,
      name: "Ngày thực trả",
      dataField: "real_payment_date",
      align: "center",
      type: "date",
    },
    {
      width: 100,
      name: "Trạng thái",
      dataField: "status",
    },
    {
      width: 120,
      name: "Ngày kết thúc",
      dataField: "end_date",
      align: "center",
      type: "date",
    },
    {
      width: 150,
      name: "Người gửi",
      dataField: "sender_name",
    },
    {
      width: 150,
      name: "Người nhận",
      dataField: "receiver_name",
    },
  ];

  return {
    columns,
  };
};
