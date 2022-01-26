import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/shared";
import Keluarga from "./Keluarga";
import Pekerjaan from "./Pekerjaan";
import Pendidikan from "./Pendidikan";
import Pokok from "./Pokok";
import {
  FaAngleDown,
  FaAngleUp,
  FaClosedCaptioning,
  FaUser,
  FaWindowClose,
} from "react-icons/fa";

import { GlobalContext, KaryawanContext } from "../../context";

import Detail from "./Detail";
import Pelatihan from "./Pelatihan";
import Suratperingatan from "./Suratperingatan";

const Subpage = styled.div`
  position: absolute;
  top: 10px;
  background-color: white;
  margin: 8px;
  width: calc(90% - 80px);
  /* height: ${({ height }) => (height ? height : "450px")}; */
  min-height: 450px;
  min-width: 250px;
  height: calc(100% - 90px);
  box-shadow: 0.2px 4px 4px 0.2px rgba(0, 0, 0, 0.5);
  overflow: overlay;
  /* padding: 25px 25px 40px 25px; */
`;
const Contentpage = styled.div`
  padding: 25px 25px 40px 25px;
  & h3 {
    cursor: pointer;
    padding: 5px;
    padding-left: 0px;
    background-color: whitesmoke;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
  }
`;
const Actionpage = styled.div`
  display: flex;
  padding: 5px;
  justify-content: flex-end;
`;

function Tambah(props) {
  const [keluarga, setkeluarga] = useState(false);
  const [pendidikan, setpendidikan] = useState(false);
  const [pekerjaan, setpekerjaan] = useState(false);
  const { karyawans, selected, dispatchKaryawan, getKaryawans } =
    useContext(KaryawanContext);
  const { loading } = useContext(GlobalContext);

  return (
   
      <Subpage>
        <div
          style={{
            position: "sticky",
            top: "-2px",
            fontSize: "18px",
            cursor: "pointer",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 2,
            padding: "0px 25px 0px 25px",
          }}
        >
          <h3>
            <FaUser style={{ marginRight: "8px" }} />
            {props.titlepage}
          </h3>
          <FaWindowClose
            onClick={() => {
              dispatchKaryawan({ type: "SELECTED", payload: null });
              dispatchKaryawan({ type: "GET_KARYAWAN", payload: null });
              dispatchKaryawan({
                type: "GET_DATA_PEKERJAAN",
                payload: [],
                param: { id: null },
              });
              getKaryawans();
              props.onCloseDialog();
            }}
          />
        </div>

        <Contentpage>
          {/* <h3
          onClick={() => {
            openlist("pokok");
          }}
        >
          Data Pokok Karyawan {pokok ? <FaAngleUp /> : <FaAngleDown />}
        </h3> */}
          {props.pokok ? (
            <Pokok />
          ) : props.keluarga ? (
            <Keluarga />
          ) : props.pekerjaan ? (
            <Pekerjaan />
          ) : props.pendidikan ? (
            <Pendidikan />
          ) : props.detail ? (
            <Detail />
          ) : props.pelatihan ? (
            <Pelatihan />
          ) : props.peringatan ? (
            <Suratperingatan />
          ) : (
            <></>
          )}

          {/* {selected ? (
          <>
            <h3
              onClick={() => {
              openlist("keluarga");
              }}
            >
              Riwayat Keluarga
              {keluarga ? <FaAngleUp /> : <FaAngleDown />}
            </h3>
            {keluarga ? <Keluarga /> : <></>}

            <h3
              onClick={() => {
                openlist("pekerjaan");
              }}
            >
              Riwayat Pekerjaan{pekerjaan ? <FaAngleUp /> : <FaAngleDown />}
            </h3>
            {pekerjaan ? <Pekerjaan /> : <></>}

            <h3
              onClick={() => {
                openlist("pendidikan");
              }}
            >
              Riwayat Pendidikan{pendidikan ? <FaAngleUp /> : <FaAngleDown />}
            </h3>
            {pendidikan ? <Pendidikan /> : <></>}
          </>
        ) : (
          <></>
        )} */}
        </Contentpage>
        <Actionpage></Actionpage>
      </Subpage>
 
  );
}

export default Tambah;
