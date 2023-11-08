import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";

export default function CustomToolbar() {
    return (
        <GridToolbarContainer sx={{ margin: "10px" }}>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport
                csvOptions={{
                    fileName: "FTD Report",
                    utf8WithBom: true,
                }}
            />
        </GridToolbarContainer>
    );
}
