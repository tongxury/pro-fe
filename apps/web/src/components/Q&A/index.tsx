import { questions } from "@/constants";
import Image from "next/image";
import downOutlined from "../../assets/svg/downOutlined.svg";
import { useState } from "react";
import { useTranslations } from "next-intl";
import "./index.scss";

const QA = () => {
    const [expandedItem, setExpandedItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);
    const questions_list = questions.slice(0, 3);

    const t = useTranslations("QA");
    const toggleItem = (index: any) => {
        setCurrentIndex(index);
        if (expandedItem === index) {
            setExpandedItem(null);
        } else {
            setExpandedItem(index);
        }
    };
    return (
        <div className="questions-list">
            {questions_list.map((item, index) => (
                <div key={item.answer} className={"item-box" + (index === questions_list.length - 1 ? " active" : "")}>
                    <div
                        onClick={() => toggleItem(index)}
                        className={`questions-item ${currentIndex === index ? "active" : ""}`}
                    >
                        <span className="question">{t(item.question)} </span>
                        <Image
                            style={{
                                width: 20,
                                height: 20,
                                transform: expandedItem === index ? "rotate(0)" : "rotate(180deg)"
                            }}
                            src={downOutlined}
                            alt=""
                        />
                    </div>
                    {expandedItem === index && <div className="questions-answer">{t(item.answer)}</div>}
                </div>
            ))}
        </div>
    );
};

export default QA;
