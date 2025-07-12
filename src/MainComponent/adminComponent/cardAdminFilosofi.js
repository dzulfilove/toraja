import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { sanitize } from "./utils";

const CardAdminFilosofi = ({ id, title, description, topic }) => {
  return (
    <Link to={`/admin/${topic}/detail/${id}`}>
      <motion.div className="card-admin">
        <p className="card-admin-title">{title}</p>
        <div
          className="small-desc"
          dangerouslySetInnerHTML={{
            __html: sanitize(description.substring(0, 60)+ "......"),
          }}
        ></div>
        <div className="go-corner">
          <div className="go-arrow">→</div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CardAdminFilosofi;
