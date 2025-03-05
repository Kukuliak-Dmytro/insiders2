import { Button } from "../ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToPreviousPage?: () => void;
  goToNextPage?: () => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  goToPreviousPage,
  goToNextPage,
}: PaginationProps) {
  return (
    <div className="flex justify-center gap-4 items-center">
      <Button
        disabled={currentPage === 1}
        onClick={goToPreviousPage}
      >
        Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        disabled={currentPage === totalPages}
        onClick={goToNextPage }
      >
        Next
      </Button>
    </div>
  );
}
