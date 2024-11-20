import CustomDateEditor from "./DateEditor";
import DateRenderer from "./DateRenderer";

export const rawData = [
  {
    product: "HPE EL8000 5U CTO Front Cabling Chassis",
    order: 10001,
    price: 64950,
    shipped: true,
    delivery: new Date("2024-12-25"),
    status: "Pricing",
  },
  {
    product: "Hawkeye III Lite",
    order: 10002,
    price: 33850,
    shipped: false,
    delivery: new Date("2025-10-23"),
    status: "Pricing",
  },
  {
    product: "Expeditionary Networking and Compute Platform",
    order: 10003,
    price: 29600,
    shipped: false,
    delivery: new Date("2025-08-28"),
    status: "New",
  },
  {
    product: "Dell Latitude 5430 Rugged",
    order: 10004,
    price: 48890,
    shipped: true,
    delivery: new Date("2025-02-14"),
    status: "Complete",
  },
  {
    product: "AC Power Supply, Outdoor, 120W, Switchcraft",
    order: 10005,
    price: 15774,
    shipped: false,
    delivery: new Date("2025-01-10"),
    status: "Complete",
  },
  {
    product: "2TB SSD Hard Drive",
    order: 10006,
    price: 18460,
    shipped: false,
    delivery: new Date("2025-07-04"),
    status: "New",
  },
  {
    product: "128 GB RAM",
    order: 10007,
    price: 33795,
    shipped: true,
    delivery: new Date("2024-09-10"),
    status: "Proposal Submitted",
  },
  {
    product: "Dell Latitude 5430 Rugged",
    order: 10008,
    price: 175720,
    shipped: false,
    delivery: new Date("2024-12-25"),
    status: "Proposal Submitted",
  },
  {
    product: "2TB SSD Hard Drive",
    order: 10009,
    price: 25795,
    shipped: false,
    delivery: new Date("2025-04-01"),
    status: "Proposal Submitted",
  },
  {
    product: "AC Power Supply, Outdoor, 120W, Switchcraft",
    order: 10010,
    price: 13724,
    shipped: false,
    delivery: new Date("2024-11-29"),
    status: "New",
  },
  {
    product: "16GB RAM",
    order: 10011,
    price: 69425,
    shipped: true,
    delivery: new Date("2025-05-04"),
    status: "Invoicing",
  },
  {
    product: "HPE EL8000 5U CTO Front Cabling Chassis",
    order: 10012,
    price: 64950,
    shipped: true,
    delivery: new Date("2024-06-15"),
    status: "Invoicing",
  },
  {
    product: "Hawkeye III Lite",
    order: 10013,
    price: 33850,
    shipped: false,
    delivery: new Date("2025-10-23"),
    status: "New",
  },
  {
    product: "Expeditionary Networking and Compute Platform",
    order: 10014,
    price: 29600,
    shipped: false,
    delivery: new Date("2025-08-28"),
    status: "Invoicing",
  },
  {
    product: "Dell Latitude 5430 Rugged",
    order: 10015,
    price: 48890,
    shipped: true,
    delivery: new Date("2025-02-14"),
    status: "New",
  },
  {
    product: "AC Power Supply, Outdoor, 120W, Switchcraft",
    order: 10016,
    price: 15774,
    shipped: false,
    delivery: new Date("2025-01-10"),
    status: "Complete",
  },
  {
    product: "2TB SSD Hard Drive",
    order: 10017,
    price: 18460,
    shipped: false,
    delivery: new Date("2025-07-04"),
    status: "Awarded",
  },
  {
    product: "128 GB RAM",
    order: 10018,
    price: 33795,
    shipped: true,
    delivery: new Date("2024-09-10"),
    status: "Awarded",
  },
  {
    product: "Dell Latitude 5430 Rugged",
    order: 10019,
    price: 175720,
    shipped: false,
    delivery: new Date("2024-12-25"),
    status: "New",
  },
  {
    product: "2TB SSD Hard Drive",
    order: 10020,
    price: 25795,
    shipped: false,
    delivery: new Date("2025-04-01"),
    status: "New",
  },
  {
    product: "AC Power Supply, Outdoor, 120W, Switchcraft",
    order: 10021,
    price: 13724,
    shipped: false,
    delivery: new Date("2024-11-29"),
    status: "PCA Review",
  },
  {
    product: "16GB RAM",
    order: 10022,
    price: 69425,
    shipped: true,
    delivery: new Date("2025-05-04"),
    status: "PCA Review",
  },
  {
    product: "HPE EL8000 5U CTO Front Cabling Chassis",
    order: 10023,
    price: 64950,
    shipped: true,
    delivery: new Date("2024-06-15"),
    status: "New",
  },
  {
    product: "Hawkeye III Lite",
    order: 10024,
    price: 33850,
    shipped: false,
    delivery: new Date("2025-10-23"),
    status: "New",
  },
  {
    product: "Expeditionary Networking and Compute Platform",
    order: 10025,
    price: 29600,
    shipped: false,
    delivery: new Date("2025-08-28"),
    status: "Awaiting Funding",
  },
  {
    product: "Dell Latitude 5430 Rugged",
    order: 10026,
    price: 48890,
    shipped: true,
    delivery: new Date("2025-02-14"),
    status: "New",
  },
  {
    product: "AC Power Supply, Outdoor, 120W, Switchcraft",
    order: 10027,
    price: 15774,
    shipped: false,
    delivery: new Date("2025-01-10"),
    status: "Pricing",
  },
  {
    product: "2TB SSD Hard Drive",
    order: 10028,
    price: 18460,
    shipped: false,
    delivery: new Date("2025-07-04"),
    status: "New",
  },
  {
    product: "128 GB RAM",
    order: 10029,
    price: 33795,
    shipped: true,
    delivery: new Date("2024-09-10"),
    status: "Pricing",
  },
  {
    product: "Dell Latitude 5430 Rugged",
    order: 10030,
    price: 175720,
    shipped: false,
    delivery: new Date("2024-12-25"),
    status: "Pricing Approved",
  },
  {
    product: "2TB SSD Hard Drive",
    order: 10031,
    price: 25795,
    shipped: false,
    delivery: new Date("2025-04-01"),
    status: "Awarded",
  },
  {
    product: "AC Power Supply, Outdoor, 120W, Switchcraft",
    order: 10032,
    price: 13724,
    shipped: false,
    delivery: new Date("2024-11-29"),
    status: "Bid",
  },
  {
    product: "16GB RAM",
    order: 10033,
    price: 69425,
    shipped: true,
    delivery: new Date("2025-05-04"),
    status: "Complete",
  },
];

export const rawCols = [
  {
    field: "product",
    editable: true,
    cellEditor: "agSelectCellEditor",
    cellEditorParams: {
      values: [
        "HPE EL8000 5U CTO Front Cabling Chassis",
        "Hawkeye III Lite",
        "Expeditionary Networking and Compute Platform",
        "Dell Latitude 5430 Rugged",
        "AC Power Supply, Outdoor, 120W, Switchcraft",
        "2TB SSD Hard Drive",
        "128 GB RAM",
        "16GB RAM",
      ],
    },
  },
  {
    field: "status",
    editable: true,
    cellEditor: "agSelectCellEditor",
    cellEditorParams: {
      values: [
        "New",
        "Awaiting Funding",
        "Review",
        "Bid",
        "No Bid",
        "Pricing",
        "PCA Review",
        "Pricing Approved",
        "Proposal Submitted",
        "Awarded",
        "Invoicing",
        "Complete",
      ],
    },
  },
  { field: "shipped" },
  { field: "order", filter: "agNumberColumnFilter" },
  { field: "price", filter: "agNumberColumnFilter" },
  {
    headerName: "Delivery Date",
    field: "delivery",
    editable: true,
    cellEditor: CustomDateEditor,
    cellEditorParams: (params) => ({
      dateFormat: "yyyy-MM-dd",
      stopEditing: () => {
        params.api.stopEditing(); // Ensure the grid stops editing mode
      },
      onValueChange: (date) => {
        params.node.setDataValue("delivery", date); // Properly set the value in grid data
      },
    }),
    cellEditorPopup: true, // Ensure the editor is rendered as a popup
  },
];
