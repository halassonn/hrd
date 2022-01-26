import React, { useState, useContext, useEffect } from "react";
import { Section } from "../../components";
import styled from "styled-components";
import Cari from "../../components/shared/Cari";
import { KaryawanContext, GlobalContext } from "../../context";
import Listdata from "../../components/shared/Listdata";
import { useTheme } from "../../theme/useTheme";
import { MdDelete, MdEdit } from "react-icons/md";
import { Button } from "../../components/shared";
import { FaEye } from "react-icons/fa";

const Tabledata = styled(Listdata)`
  margin: 8px;
  width: calc(100% - 16px);
  height: ${({ height }) => (height ? height : "450px")};
  box-shadow: 0.2px 4px 4px 0.2px rgba(0, 0, 0, 0.5);
  & table {
    & thead {
      color: ${({ theme }) => theme.colors.primary.text};
    }
  }
`;
const cols = [
  { id: "nik", title: "Nik" },
  { id: "noktp", title: "No KTP" },
  { id: "nama", title: "Nama" },
  { id: "status_kawin", title: "Status Kawin" },
  { id: "jenis_kelamin", title: "Jenis Kelamin" },
  { id: "action", title: "" },
];

function Datakaryawan(props) {
  const [open, setOpen] = useState(false);
  const { titlepage } = props;
  const [caridata, setCaridata] = useState(null);
  const { karyawans, getKaryawans, dispatchKaryawan, deleteDataKaryawan } =
    useContext(KaryawanContext);
  const { setResponse, closeResponse, loading } = useContext(GlobalContext);
  const [listkaryawan, setListKaryawan] = useState([]);
  const { theme } = useTheme();

  const onFilterData = (f) => {
    f.persist();
    setCaridata(
      karyawans &&
        karyawans.filter(
          (e) =>
            e.nama.toString().toLowerCase().includes(f.target.value) ||
            e.nik.toString().includes(f.target.value) ||
            e.noktp.toString().includes(f.target.value)
        )
    );
  };

  useEffect(() => {
    let a = true;
    if (a) {
      getKaryawans();
      // setSelectedindex(-1);
    }
    return () => {
      a = false;
    };
  }, []);

  useEffect(() => {
    let a = true;
    if (a) {
      setListKaryawan(
        karyawans.map((e) => {
          return {
            ...e,
            action: tableAction(e),
          };
        })
      );
    }

    return () => {
      a = false;
    };
  }, [karyawans]);

  const onEdit = (data) => {
    dispatchKaryawan({
      type: "SELECTED",
      payload: data,
    });
    props.openform(0);
  };
  const showdata = (data) => {
    dispatchKaryawan({
      type: "SELECTED",
      payload: data,
    });
    props.openform(7);
  };
  const onHapus = (data) => {
    setResponse({
      show: true,
      message: `Benar Data Pokok Karyawan ingin di Hapus?`,
      action: null,
      children: (
        <div>
          <Button onClick={closeResponse}>Tidak</Button>
          <Button
            onClick={() => {
              deleteDataKaryawan(data.nik);
            }}
          >
            Ya
          </Button>
        </div>
      ),
    });
  };

  const tableAction = (e) => {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-end",
          fontSize: "16px",
        }}
      >
        <FaEye
          style={{ cursor: "pointer", marginRight: "5px" }}
          onClick={() => {
            showdata(e);
          }}
        />
        <MdEdit
          style={{ cursor: "pointer", marginRight: "5px" }}
          onClick={() => {
            onEdit(e);
          }}
        />
        <MdDelete
          style={{ cursor: "pointer" }}
          onClick={() => {
            onHapus(e);
          }}
        />
      </div>
    );
  };

  return (
    <Section open={open}>
      <h1>{titlepage || ""}</h1>
      <Cari
        autoComplete="off"
        id="cari"
        placeholder="Cari Data...."
        onChange={onFilterData}
        style={{ margin: "8px" }}
      />
      <Tabledata
        theme={theme}
        rowperpage={5}
        rowsPerPageOptions={[5, 10, 15, "all"]}
        rowfilterby=""
        search_data=""
        cols={cols}
        datarows={caridata ? caridata : listkaryawan || []}
      />
    </Section>
  );
}

export default Datakaryawan;
