import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import FaceIcon from "@material-ui/icons/Face";
import format from "date-fns/format";
import lockIcon from "./2x/baseline_lock_black_18dp.png";
import unlockIcon from "./2x/baseline_lock_open_black_18dp.png";
import Button from "@material-ui/core/Button";

import Context from "../../context";
import CreateComment from "../Comment/CreateComment";
import Comments from "../Comment/Comments";
import { getInstantUserPosition } from "../Map";
import { Link } from "@material-ui/core";


const PinContent = ({ classes }) => {
  const { state } = useContext(Context);
  // noinspection JSAnnotator
  const {
    title,
    content,
    author,
    createdAt,
    comments,
    privacy,
    latitude,
    longitude
  } = state.currentPin;
  const userCoordinates = getInstantUserPosition();

  function handlePrivacyIcon() {
    if (privacy) {
      return <img src={lockIcon} alt="lock" />;
    }
    if (!privacy) {
      return <img src={unlockIcon} alt="unlock" />;
    }
  }

  function handlePrivacy() {
    if (privacy) {
      return " private";
    }
    if (!privacy) {
      return " public";
    }
  }

  let runDirections = () => {
    return `https://www.google.com/maps/dir/?api=1&origin=${
      userCoordinates[0]
    },${userCoordinates[1]}&destination=${latitude},${longitude}`;
  };

  return (
    <div className={classes.root}>
      <Typography
        component="h2"
        variant="h4"
        gutterBottom
        style={{ color: "#2E3B55" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        color="primary"
        gutterBottom
        style={{ color: "#2E3B55" }}
      >
        {handlePrivacyIcon()}
        <br />
        {handlePrivacy()}
      </Typography>
      <Typography
        className={classes.text}
        component="h3"
        variant="h6"
        gutterBottom
      >
        <FaceIcon className={classes.icon} />
        {author.name}
      </Typography>
      <Typography
        className={classes.text}
        variant="subtitle2"
        color="inherit"
        gutterBottom
      >
        <AccessTimeIcon className={classes.icon} />
        {format(Number(createdAt), "MMM Do, YYYY")}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {content}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <Link href={runDirections()} target={runDirections()}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            style={{ textDecoration: "none" }}
          >
            Directions
          </Button>
        </Link>
      </Typography>

      <CreateComment />

      <Comments comments={comments} />
    </div>
  );
};

const styles = theme => ({
  root: {
    padding: "1em 0.5em",
    textAlign: "center",
    width: "100%"
  },
  icon: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  text: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default withStyles(styles)(PinContent);
