import { TbAssembly, TbBrandCampaignmonitor, TbHome2 } from "react-icons/tb";

export const paths = [
  {
    name: "Dashboard",
    path: "",
    icon: <TbHome2 />,
  },
  {
    name: "Campaign",
    icon: <TbBrandCampaignmonitor />,
    path: "campaigns",
  },
  {
    name: "Update Campaign",
    icon: <TbAssembly />,
  },
];

export const desinationTypeList = [
  { label: "Ivr", value: "Ivr" },
  { label: "Target", value: "Target" },
];

export const format_list = [
  { id: 1, label: "(###) #### ### ###", value: "(###) #### ### ###" },
  { id: 2, label: "(##) ### ### ####", value: "(##) ### ### ####" },
];
export const calls_types = [
  { id: 1, label: "Same target", value: "Same target" },
  { id: 2, label: "Different target", value: "Different target" },
  { id: 3, label: "Random", value: "Random" },
];
