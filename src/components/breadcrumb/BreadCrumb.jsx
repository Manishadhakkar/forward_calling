import { Link } from "react-router-dom";
import "./style.css";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";

const Breadcrumb = (props) => {
  const { pathList } = props;

  const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.mode === "light" ? "#141414" : "#f3f6f4",
      fontWeight: theme.typography.fontWeightRegular,
      "&:hover, &:focus": {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      "&:active": {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  });

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {pathList.length &&
          pathList.map((item, index) => {
            if (index === pathList.length - 1) {
              return (
                <StyledBreadcrumb
                  label={item.name}
                  key={index}
                  icon={item.icon}
                />
              );
            } else {
              return (
                <Link
                  to={{
                    pathname: `/${item.path}`,
                  }}
                  key={index}
                >
                  <StyledBreadcrumb icon={item.icon} label={item.name} />
                </Link>
              );
            }
          })}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
