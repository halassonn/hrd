import React, { useEffect, useState, useContext } from "react";
import { FaHamburger, FaStarOfLife, FaWindowClose } from "react-icons/fa";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import {
  Mul,
  Windowbodystyled,
  Wpage,
  WPheader,
  Menuitem,
  Menuitemlabel,
  Menuitemicon,
  Dialog,
  Loading,
} from "../../../components";
import { v4 as uuid } from "uuid";
import { AiOutlineSetting } from "react-icons/ai";
import { Box, Button, Modal } from "../../../components/shared";
import User from "./User";
import Datakantor from "./Datakantor";
import Jabatan from "./Jabatan";
import UserContextProvider from "../../../context/Usercontext";
import DatakantorContextProvider from "../../../context/DatakantorContext";
import { KaryawanContext, GlobalContext } from "../../../context";
import Formuser from "./Formuser";
import Formdatakantor from "./Formdatakantor";
import Formjabatan from "./Formjabatan";
import Settingform from "./Settingform";
import Gantipassword from "./Gantipassword";

const Windowpageheaderstyled = styled(WPheader)`
  background-color: ${({ theme }) => theme.colors.primary.main};
  & #menu {
    display: none;
  }
  @media (max-width: 700px) {
    & #menu {
      display: inherit;
    }
  }
`;

const menu = [
  { path: "profile", title: "Ganti Password" },
  // { path: "user", title: "Data User" },
  { path: "kodekantor", title: "Data Kantor" },
  { path: "jabatan", title: "Parameter Jabatan" },
  // { path: "bpjs", title: "Parameter BPJS" },
  // { path: "pph21", title: "Parameter pph21" },
  // { path: "tgl_penggajian", title: "Tanggal Penggajian" },
];
var el = null;
var form = null;

function Settings(props) {
  const { history } = props;
  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState();
  const [showmenu, setShowmenu] = useState(false);
  const { response, closeResponse, loading } = useContext(GlobalContext);
  const openSubPage = (p) => {
    switch (p) {
      case "profile":
        el = (
          <Gantipassword
            titlepage="Ganti Password"
            openform={(e) => {
              openNewForm(e);
            }}
          />
        );
        break;
      case "kodekantor":
        el = <Datakantor titlepage="Setting Data Kantor" />;
        break;
      case "jabatan":
        el = <Jabatan titlepage="Setting Parameter Jabatan" />;
        break;
      // case "bpjs":
      //   el = (
      //     <Bpjspage titlepage="Setting Parameter BPJS Jamsostek/Kesehatan" />
      //   );
      //   break;
      // case "pph21":
      //   el = <Ptkppage titlepage="Setting Parameter PPh21" />;
      //   break;
      // case "tgl_penggajian":
      //   el = (
      //     <Tanggalpenggajian
      //       history={history}
      //       titlepage="Setting Tanggal Penggajian"
      //     />
      //   );
      // break;
      default:
        el = null;
        break;
    }
  };
  const onShowMenu = () => {
    setShowmenu(!showmenu);
  };
  const onClose = () => {
    history.push("/admin");
    el = null;
  };

  const openNewForm = (el) => {
    setOpenForm(true);
    if (el === "user") {
      setForm(
        <Settingform
          onCloseDialog={() => setOpenForm(false)}
          el={<Formuser />}
          titlepage="Data User"
        />
      );
    } else if (el === "datakantor") {
      setForm(
        <Settingform
          onCloseDialog={() => setOpenForm(false)}
          el={<Formdatakantor />}
          titlepage="Data Kantor"
        />
      );
    } else if (el === "jabatan") {
      setForm(
        <Settingform
          onCloseDialog={() => setOpenForm(false)}
          el={<Formjabatan />}
          titlepage="Data Jabatan"
        />
      );
    }
  };

  return (
    <UserContextProvider>
      <DatakantorContextProvider>
        <div className="page">
          <Wpage>
            <Windowpageheaderstyled>
              <h2>
                <FaHamburger />
              </h2>
              <h2>
                <AiOutlineSetting /> Settings
              </h2>
              <h2 style={{ marginRight: "5px", cursor: "pointer" }}>
                <FaWindowClose
                  onClick={() => {
                    onClose();
                  }}
                />
              </h2>
            </Windowpageheaderstyled>

            <Windowbodystyled showmenu={showmenu}>
              <div id="side1">
                <Mul style={{ height: "calc(100% - 80px)" }}>
                  {menu.map((item) => {
                    return (
                      <Menuitem
                        key={uuid()}
                        to="#"
                        onClick={() => {
                          openSubPage(item.path);
                          onShowMenu();
                        }}
                      >
                        <Menuitemlabel open={true}>
                          <Menuitemicon style={{ width: "50px" }}>
                            <FaStarOfLife size="12px" />
                          </Menuitemicon>
                          {item.title}
                        </Menuitemlabel>
                      </Menuitem>
                    );
                  })}
                </Mul>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "20px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "8px",
                      marginBlockStart: "0",
                      marginBlockEnd: "0",
                      fontStyle: "italic",
                    }}
                  >
                    HRD System Application
                  </p>
                  <p
                    style={{
                      fontSize: "8px",
                      marginBlockStart: "0",
                      marginBlockEnd: "0",
                      fontStyle: "italic",
                    }}
                  >
                    version : 1.0
                  </p>
                  <p
                    style={{
                      fontSize: "8px",
                      marginBlockStart: "0",
                      marginBlockEnd: "0",
                      fontStyle: "italic",
                    }}
                  >
                    Created by : Halasson Gultom
                  </p>
                </div>
              </div>
              <div id="side2">{el}</div>
              {openForm && <div className="dialog">{form || <></>}</div>}
            </Windowbodystyled>
          </Wpage>
          <Dialog
            open={response.show}
            onClose={() => closeResponse()}
            message={response.message}
            action={response.children}
          />

          <Modal open={loading}>
            <Loading />
          </Modal>
        </div>
      </DatakantorContextProvider>
    </UserContextProvider>
  );
}

export default withRouter(Settings);
