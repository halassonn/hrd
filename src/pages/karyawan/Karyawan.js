import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
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
} from "../../components";
import { v4 as uuid } from "uuid";
import { FaHamburger, FaStarOfLife, FaWindowClose } from "react-icons/fa";
import { ReactComponent as Spinner } from "../../components/image/spinner2.svg";
import Cari from "../../components/shared/Cari";
import { KaryawanContext, GlobalContext, AuthContext } from "../../context";
import KaryawanContextProvider from "../../context/Karyawancontext";
import ParameterContextProvider from "../../context/Parametercontext";
import { useTheme } from "../../theme/useTheme";
import Datakaryawan from "./Datakaryawan";
import { Button, Modal } from "../../components/shared";
import Tambah from "./Tambah";
import { MdClose } from "react-icons/md";

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

var el = null;

function Karyawan(props) {
  const { history } = props;
  const [showmenu, setShowmenu] = useState(false);
  const { response, closeResponse, loading } = useContext(GlobalContext);
  const { level } = useContext(AuthContext);

  const [menu, setMenu] = useState([
    {
      path: "data",
      title: "Data Pokok Karyawan",
      aktif: false,
      component: (
        <Tambah
          pokok={true}
          onCloseDialog={() => {
            setOpen(false);
          }}
          titlepage="Data Pokok Karyawan"
        />
      ),
    },
    {
      path: "data",
      title: "Riwayat Keluarga",
      aktif: false,
      component: (
        <Tambah
          keluarga={true}
          onCloseDialog={() => {
            setOpen(false);
          }}
          titlepage="Riwayat Keluarga"
        />
      ),
    },

    {
      path: "data",
      title: "Riwayat Pendidikan",
      aktif: false,
      component: (
        <Tambah
          pendidikan={true}
          onCloseDialog={() => {
            setOpen(false);
          }}
          titlepage="Riwayat Pendidikan"
        />
      ),
    },
    {
      path: "data",
      title: "Riwayat Pekerjaan / Jabatan",
      aktif: false,
      component: (
        <Tambah
          pekerjaan={true}
          onCloseDialog={() => {
            setOpen(false);
          }}
          titlepage="Riwayat Pekerjaan / Jabatan"
        />
      ),
    },
    {
      path: "data",
      title: "Riwayat Pelatihan",
      aktif: false,
      component: (
        <Tambah
          pelatihan={true}
          onCloseDialog={() => {
            setOpen(false);
          }}
          titlepage="Riwayat Pelatihan"
        />
      ),
    },
    {
      path: "data",
      title: "Riwayat Surat Peringatan",
      aktif: false,
      component: (
        <Tambah
          peringatan={true}
          onCloseDialog={() => {
            setOpen(false);
          }}
          titlepage="Riwayat Surat Peringatan"
        />
      ),
    },

    // {
    //   path: "data",
    //   title: "Detail Data Karyawan",
    //   aktif: false,
    //   component: (
    //     <Tambah detail={false}
    //       onCloseDialog={() => {
    //         setOpen(false);
    //       }}
    //       titlepage="Riwayat Pelatihan"
    //     />
    //   ),
    // },
    // {
    //   path: "import",
    //   title: "Import/Export Data Karyawan",
    //   aktif: false,
    //   component: (
    //     <Tambah
    //       onCloseDialog={() => {
    //         setOpen(false);
    //       }}
    //       titlepage="Data Karyawan"
    //     />
    //   ),
    // },
    // {
    //   path: "cetak",
    //   title: "Cetak Data Karyawan",
    //   aktif: false,
    //   component: (
    //     <Button
    //       onClick={() => {
    //         setOpen(false);
    //       }}
    //     >
    //       Close
    //     </Button>
    //   ),
    // },
  ]);

  const openSubPage = (p) => {
    // setMenu((m) => [...m, m.map((e) => e)]);

    if (p) {
      const x = menu.find((mm) => mm.path === p.path);

      if (x) {
        x.aktif = true;
        setOpen(true);
      }

      el = p.component;
    } else {
      setOpen(true);
      el = (
        <Tambah
          detail={true}
          onCloseDialog={() => {
            setOpen(false);
          }}
          titlepage="Detail Data Karyawan"
        />
      );
    }

    // else {
    //   el = (
    //     <Tambah
    //       pokok={true}
    //       onCloseDialog={() => {
    //         setOpen(false);
    //       }}
    //       titlepage="Detail Data Karyawan"
    //     />
    //   );
    // }
  };
  const onShowMenu = () => {
    setShowmenu(!showmenu);
  };
  const onClose = () => {
    level === "root" || level === "Administrator"
      ? history.push("/admin")
      : history.push("/home");
    // el = null;
  };

  // useEffect(() => {
  //   let a = true;
  //   if (a) {
  //     openSubPage("tambah");
  //   }

  //   return () => {
  //     a = false;
  //   };
  // }, []);

  const [open, setOpen] = useState(false);
  // const {
  //   karyawans
  // } = useContext(KaryawanContext);
  const { theme } = useTheme();

  const [selectedindex, setSelectedindex] = useState(-1);
  const [selected, setSelected] = useState(null);
  const [caridata, setCaridata] = useState(null);

  // const onFilterData = (f) => {
  //   f.persist();
  //   setCaridata(
  //     karyawans &&
  //       karyawans.filter(
  //         (e) =>
  //           e.kode.toString().toLowerCase().includes(f.target.value) ||
  //           e.nama.toString().includes(f.target.value)
  //       )
  //   );
  // };

  return (
    <KaryawanContextProvider>
      <div className="page">
        <Wpage>
          <Windowpageheaderstyled>
            <h2>Data Karyawan</h2>
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
                {menu.map((item, index) => {
                  return (
                    <Menuitem
                      key={uuid()}
                      to="#"
                      onClick={() => {
                        openSubPage(item);
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
            <div id="side2">
              <Datakaryawan
                openform={(e) => {
                  openSubPage(menu[e]);
                }}
              />
            </div>
            {open && <div className="dialog">{el}</div>}
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
    </KaryawanContextProvider>
  );
}

export default withRouter(Karyawan);
