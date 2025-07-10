import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CardAdminFilosofi = ({
  id,
  title,
  description,
  topic,
}) => {
  return (
    <Link to={`/admin/${topic}/detail/${id}`}>
      <motion.div
        className="card"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="card-title">{title}</p>
        <p className="small-desc">{description}</p>
        <div className="go-corner">
          <div className="go-arrow">→</div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CardAdminFilosofi;
