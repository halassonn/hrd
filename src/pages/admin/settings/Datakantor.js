import React, { useEffect, useState, useContext } from "react";
import { DatakantorContext } from "../../../context";
import DatakantorContextProvider from "../../../context/DatakantorContext";
import { Section } from "../../../components";
import Cari from "../../../components/shared/Cari";
import Listdata from "../../../components/shared/Listdata";
import styled from "styled-components";
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

function Datakantor(props) {
  const { titlepage } = props;
  const [open, setOpen] = useState(false);
  const { datakantor, simpanDataKantor, getDataKantor, deleteDatakantor } =
    useContext(DatakantorContext);
  const { theme } = useTheme();

  const [selectedindex, setSelectedindex] = useState(-1);
  const [selected, setSelected] = useState(null);
  const [caridata, setCaridata] = useState(null);

  const onFilterData = (f) => {
    f.persist();
    setCaridata(
      datakantor &&
        datakantor.filter(
          (e) =>
            e.kode.toString().toLowerCase().includes(f.target.value) ||
            e.nama.toString().includes(f.target.value)
        )
    );
  };

  useEffect(() => {
    let a = true;
    if (a) {
      getDataKantor();
    }

    return () => {
      a = false;
    };
  }, []);
  return (
    <DatakantorContextProvider>
      <Section open={open}>
        <h1>{titlepage}</h1>
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
          selectindex={selectedindex}
          cols={[
            { id: "kode", title: "Kode" },
            { id: "nama", title: "Nama" },
            { id: "alamat", title: "Alamat" },
            { id: "pimpinan", title: "Pimpinan" },
          ]}
          datarows={caridata ? caridata : datakantor || []}
          onSelect={() => {}}
        />
      </Section>
    </DatakantorContextProvider>
  );
}

export default Datakantor;
