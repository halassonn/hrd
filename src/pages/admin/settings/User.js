import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Section } from "../../../components";
import { Button } from "../../../components/shared";
import Cari from "../../../components/shared/Cari";
import Listdata from "../../../components/shared/Listdata";
import { UserContext } from "../../../context";
import { useTheme } from "../../../theme/useTheme";

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
  { id: "nama", title: "NAMA" },
  { id: "username", title: "USERNAME" },
  { id: "level", title: "Level" },
  { id: "kode_kantor", title: "KANTOR" },
];

function User(props) {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const { titlepage, openform } = props;
  const [selectedindex, setSelectedindex] = useState(-1);
  const [selected, setSelected] = useState(null);
  const [caridata, setCaridata] = useState(null);
  const { user, dispatch, addUser, deleteUser, getUsers } =
    useContext(UserContext);

  const onFilterData = (f) => {
    f.persist();
    setCaridata(
      user &&
        user.filter(
          (e) =>
            e.nama.toString().toLowerCase().includes(f.target.value) ||
            e.username.toString().includes(f.target.value)
        )
    );
  };

  useEffect(() => {
    let a = true;
    if (a) {
      getUsers();
    }

    return () => {
      a = false;
    };
  }, []);
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
      <div>
        <Button
          onClick={() => {
            openform("user");
          }}
        >
          Tambah User
        </Button>
      </div>
      <Tabledata
        theme={theme}
        rowperpage={5}
        rowsPerPageOptions={[5, 10, 15, "all"]}
        rowfilterby=""
        search_data=""
        cols={cols}
        datarows={caridata ? caridata : user || []}
      />
    </Section>
  );
}

export default User;
