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
      type: "combobox",
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

  const columnsService = [
    {
      width: 150,
      name: "Tên dịch vụ",
      dataField: "service_name",
      align: "left",
    },
    {
      width: 120,
      name: "Đơn giá",
      dataField: "unit_price",
      align: "right",
      type: "currency",
    },
    {
      width: 120,
      name: "Định mức",
      dataField: "dimension",
      align: "right",
      type: "currency",
    },
    //TODO: chỗ này sửa thành number để khong format
    {
      width: 80,
      name: "Kỳ TT",
      dataField: "payment_period",
      align: "right",
      type: "currency",
    },
    {
      autoRezie: true,
      width: 120,
      name: "Ghi chú",
      dataField: "note",
      align: "left",
    },
  ];

  const columnsServiceDetail = [
    {
      width: 120,
      name: "Dịch vụ",
      dataField: "service_name",
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
      width: 120,
      name: "Đợt",
      dataField: "payment_batch",
      align: "left",
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
      type: "combobox",
    },
    {
      autoRezie: true,
      width: 150,
      name: "Ghi chú",
      dataField: "note",
    },
    {
      width: 150,
      name: "Người thanh toán",
      dataField: "sender_name",
    },
  ];

  return {
    columns,
    columnsService,
    columnsServiceDetail,
  };
};
