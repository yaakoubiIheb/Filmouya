import React from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface PageButtonProps {
  active: boolean;
}

const PageButton = styled.button<PageButtonProps>`
  background: ${(props: any) => (props.active ? "#3498db" : "#fff")};
  color: ${(props: any) => (props.active ? "#fff" : "#333")};
  border: 1px solid #ccc;
  padding: 8px 12px;
  margin: 0 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #f9f9f9;
  }
`;

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PaginationContainer>
      {pages.map((page) => (
        <PageButton
          key={page}
          onClick={() => onPageChange(page)}
          active={page === currentPage}
        >
          {page}
        </PageButton>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;
