import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { url } from "../../config/route";
import { stripHtml } from "../adminComponent/utils";

const Card = ({ id, title, description, image, category, topic }) => {
  // Tentukan page sekali saja (tidak pakai state)
  const page =
    topic === "food"
      ? "makanan"
      : topic === "dance"
      ? "tarian"
      : topic === "tourist"
      ? "wisata"
      : "detail";

  const formatText = (text) => {
    const plainText = stripHtml(text || "");
    return plainText.length > 300
      ? plainText.substring(0, 300) + "..."
      : plainText;
  };

  const imageUrl =
    image && image.length > 0 ? `${url}/${image[0].image}` : "/default.jpg";

  return (
    <StyledWrapper image={imageUrl}>
      <Link to={`/detail/${topic}/${id}`}>
        <motion.div
          className="cardList-container font-montserrat"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="cardList">
            <div className="front-content">
              <div className="overlay" />
              <p>{title}</p>
            </div>
            <div className="content">
              <p className="heading">{title}</p>
              <p>{formatText(description)}</p>
            </div>
          </div>
        </motion.div>
      </Link>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .cardList-container {
    width: 340px;
    height: 400px;
    cursor: pointer;
    position: relative;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    overflow: hidden;

    @media (max-width: 500px) {
      width: 90%;
      height: 250px;
    }
  }

  .cardList {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    position: relative;
  }

  .cardList .front-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    background-image: url(${(props) => props.image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
  }

  .cardList .front-content .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    border-radius: inherit;
  }

  .cardList .front-content p {
    font-size: 28px;
    font-weight: 700;
    z-index: 1;
    background: #f5f5dc;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    text-align: center;
    padding: 0 10px;
  }

  .cardList .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 10px;
    background: linear-gradient(-45deg, #b8860b 0%, #8b0000 100%);
    color: #e8e8e8;
    padding: 20px;
    line-height: 1.5;
    border-radius: 5px;
    pointer-events: none;
    transform: translateX(-96%);
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);

    @media (max-width: 500px) {
      padding: 10px;
    }
  }

  .cardList .content .heading {
    font-size: 22px;
    font-weight: 700;
  }

  .cardList:hover .content {
    transform: translateY(0);
  }

  .cardList:hover .front-content {
    transform: translateX(-30%);
  }

  .cardList:hover .front-content p {
    opacity: 0;
  }
`;

export default Card;
