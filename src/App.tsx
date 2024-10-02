import classNames from "classnames";
import React from "react";
import styles from "./App.module.css";
import Popover from "./components/Popover/Popover";
import Tooltip from "./components/Tooltip/Tooltip";

const App: React.FC = () => {
  const [type, setType] = React.useState("BASE");

  function getColor() {
    if (type === "BASE") return "green";
    if (type === "VIP") return "blue";
    if (type === "SUPREME") return "purple";
  }

  return (
    <main className={styles.main}>
      <Popover
        renderArrow
        offsetValue={10}
        trigger={<div className={styles.trigger}>✏️ Edit</div>}
        placement="bottom-start"
        element={
          <div className={styles.menu}>
            <span className={styles.menuItem}>Edit this item</span>
            <span className={styles.menuItem}>Delete this item</span>
            <span className={styles.menuItem}>Export this item</span>
          </div>
        }
      />
      <Tooltip
        renderArrow={true}
        interactive
        placement="top"
        trigger={
          <div className={styles.trigger} style={{ color: getColor() }}>
            {type}
          </div>
        }
        element={
          <div className={styles.tooltip}>
            <div className={styles.cta}>Choose to update</div>
            <div className={styles.tags}>
              <button
                onClick={() => setType("BASE")}
                className={classNames({ [styles.active]: type === "BASE" })}
              >
                BASE
              </button>
              <button
                onClick={() => setType("VIP")}
                className={classNames({ [styles.active]: type === "VIP" })}
              >
                VIP
              </button>
              <button
                onClick={() => setType("SUPREME")}
                className={classNames({ [styles.active]: type === "SUPREME" })}
              >
                SUPREME
              </button>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default App;
