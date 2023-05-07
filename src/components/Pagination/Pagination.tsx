import { Box, Button, Text, useMediaQuery } from '@chakra-ui/react';
interface IProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: IProps) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const [isLargerThan768] = useMediaQuery('(min-width: 768)');

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = isLargerThan768 ? 5 : 3; // Maximum number of visible page numbers

    let startPage = 1;
    let endPage = totalPages;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage >= totalPages - Math.floor(maxVisiblePages / 2)) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - Math.floor(maxVisiblePages / 2);
      endPage = currentPage + Math.ceil(maxVisiblePages / 2) - 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          variant={currentPage === i ? 'solid' : 'outline'}
          colorScheme={currentPage === i ? 'teal' : 'gray'}
          onClick={() => handlePageChange(i)}
          size="sm"
          mx="1"
        >
          {i}
        </Button>
      );
    }

    if (startPage > 2) {
      pageNumbers.unshift(
        <Text key="first" mx="1">
          ...
        </Text>
      );
      pageNumbers.unshift(
        <Button
          key={1}
          variant="outline"
          colorScheme="gray"
          onClick={() => handlePageChange(1)}
          size="sm"
          mx="1"
        >
          1
        </Button>
      );
    } else if (startPage === 2) {
      pageNumbers.unshift(
        <Button
          key={1}
          variant="outline"
          colorScheme="gray"
          onClick={() => handlePageChange(1)}
          size="sm"
          mx="1"
        >
          1
        </Button>
      );
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push(
        <Text key="last" mx="1">
          ...
        </Text>
      );
      pageNumbers.push(
        <Button
          key={totalPages}
          variant="outline"
          colorScheme="gray"
          onClick={() => handlePageChange(totalPages)}
          size="sm"
          mx="1"
        >
          {totalPages}
        </Button>
      );
    } else if (endPage === totalPages - 1) {
      pageNumbers.push(
        <Button
          key={totalPages}
          variant="outline"
          colorScheme="gray"
          onClick={() => handlePageChange(totalPages)}
          size="sm"
          mx="1"
        >
          {totalPages}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <Box mt="4" display="flex" justifyContent="center">
      <Button
        variant="outline"
        colorScheme="teal"
        onClick={() => handlePageChange(currentPage - 1)}
        size="sm"
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      {renderPageNumbers()}
      <Button
        variant="outline"
        colorScheme="teal"
        onClick={() => handlePageChange(currentPage + 1)}
        size="sm"
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </Box>
  );
}
