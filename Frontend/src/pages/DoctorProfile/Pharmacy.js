import * as React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import SideNavBarDoctor from "../../components/SideNavBarDoctor";
import {useEffect, useState} from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {getAppointments} from "../../services/DoctorProfileService";

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


export default function PharmacyDetails() {
    const [appoinmentDetail, setAppoinmentDetail] = useState([]);
    const columns  = [
        {field: 'date', headerName: 'DATE', width: 130},
        {field: 'patientName', headerName: 'PATIENT NAME', width: 130},
        {field: 'pharmacy', headerName: 'PHARMACY DETAILS', width: 300},
        {field: 'prescription', headerName: 'PRESCRIPTION', width: 630},
    ];
    const fetchData = async () => {
        getAppointments(false)
            .then((res) => {
                // temp object to store doctor pending requests
                let data = [];

                for (let i = 0; i < res.appoinmentDetails.length; i++) {
                    data.push({
                        id: i,
                        date: res.appoinmentDetails[i]["appointmentDate"],
                        patientName: res.appoinmentDetails[i]["patientName"],
                        pharmacy: res.appoinmentDetails[i]["pharmacyName"],
                        prescription:res.appoinmentDetails[i]["prescription"]
                    });
                }
                setAppoinmentDetail(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        // call this function to fetch data
        fetchData();
    }, []);

    return (
        <Box component="form" noValidate  sx={{display: "flex"}}>
            <SideNavBarDoctor/>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                <DrawerHeader/>
                <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper sx={{p: 2, display: "flex", flexDirection: "column"}}>
                                <div style={{height: 400, width: '100%'}}>
                                    <DataGrid
                                        rows={appoinmentDetail}
                                        columns={columns}
                                        initialState={{
                                            pagination: {
                                                paginationModel: {page: 0, pageSize: 5},
                                            },
                                        }}
                                        pageSizeOptions={[5, 10]}
                                    />
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
