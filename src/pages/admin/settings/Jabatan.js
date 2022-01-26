import React, { useEffect, useState, useContext } from "react";
import { DatakantorContext, ParameterContext } from "../../../context";
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

function Jabatan(props) {
  const { titlepage } = props;
  const [open, setOpen] = useState(false);

  const { parameters, getParameters } = useContext(ParameterContext);
  const { theme } = useTheme();

  const [selectedindex, setSelectedindex] = useState(-1);
  const [selected, setSelected] = useState(null);
  const [caridata, setCaridata] = useState(null);

  const onFilterData = (f) => {
    f.persist();
    setCaridata(
      parameters.jabatan &&
        parameters.jabatan.filter(
          (e) =>
            e.kode.toString().toLowerCase().includes(f.target.value) ||
            e.desc.toString().includes(f.target.value)
        )
    );
  };

  useEffect(() => {
    let a = true;
    if (a) {
      getParameters();
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
          onChange={onFilterData} style={{ margin: "8px" }}
        />
        <Tabledata
          theme={theme}
          rowperpage={10}
          rowsPerPageOptions={[ 10, 15, "all"]}
          rowfilterby=""
          search_data=""
          selectindex={selectedindex}
          cols={[
            { id: "kode", title: "Kode" },
            { id: "desc", title: "Desc" },
            { id: "kode_tingkat_jabatan", title: "Tingkat" },
          ]}
          datarows={caridata ? caridata : parameters.jabatan || []}
          onSelect={() => {}}
        />
      </Section>
    </DatakantorContextProvider>
  );
}

export default Jabatan;
