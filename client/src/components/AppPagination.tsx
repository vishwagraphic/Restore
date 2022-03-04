import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../models/pagination";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
  const { totalCount, currentPage, pageSize, totalPages } = metaData;

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography>
        {metaData ? (currentPage - 1) * pageSize + 1 : 1}-
        {totalCount > currentPage * pageSize
          ? currentPage * pageSize
          : totalCount}{" "}
        of {totalCount ? totalCount : currentPage * pageSize} items
      </Typography>
      <Pagination
        count={totalPages}
        size="large"
        page={currentPage}
        color="secondary"
        onChange={(_, page) => onPageChange(page)}
      />
    </Box>
  );
}
