import Pagination from "react-bootstrap/Pagination";
import { useState, useEffect } from "react";

const PageNum = (props) => {
  let [active, setActive] = useState(1);
  let items = [];
  let [num, setNum] = useState({
    first_num: 1,
    last_num: 5,
  });

  useEffect(() => {
    props.lastPage < 5
      ? setNum({ ...num, last_num: props.lastPage })
      : setNum({ ...num, last_num: 5 });
  }, [props.lastPage]);

  useEffect(() => {
    setActive(props.page);
  }, [props.page]);
  // 주소창에 ?page=어쩌구 에서 어쩌구가 바뀌면 active가 되게.

  const onClickActive = (number) => {
    setActive(number);
    props.setSearchParams({ page: number });
  };

  for (let number = num.first_num; number <= num.last_num; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number == active}
        onClick={() => onClickActive(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const onClickPrev = () => {
    if (num.first_num == 1) {
      return;
    } else {
      if (num.last_num % 5 == 0) {
        setNum({
          first_num: num.first_num - 5,
          last_num: num.last_num - 5,
        });
        setActive(num.first_num - 5);
        props.setSearchParams({ page: num.first_num - 5 });
      } else {
        for (let x = 1; x <= 4; x++) {
          if (num.last_num % 5 == x) {
            setNum({
              first_num: num.first_num - 5,
              last_num: num.last_num - x,
            });
            setActive(num.first_num - 5);
            props.setSearchParams({ page: num.first_num - 5 });
          }
        }
      }
    }
  };

  const onClickNext = () => {
    if (num.last_num == props.lastPage) {
    } else {
      setNum({
        first_num: num.first_num + 5,
        last_num:
          props.lastPage < num.last_num + 5 ? props.lastPage : num.last_num + 5,
        // props.lastPage가 num + 5 보다 작으면 props.lastPage로 되게.
      });
      setActive(num.first_num + 5);
      props.setSearchParams({ page: num.first_num + 5 });
    }
  };

  const onClickFirst = () => {
    setNum({
      first_num: 1,
      last_num: props.lastPage < 5 ? props.lastPage : 5,
    });
    setActive(1);
    props.setSearchParams({ page: 1 });
  };

  const onClickLast = () => {
    if (props.lastPage % 5 == 0) {
      setNum({ first_num: props.lastPage - 4, last_num: props.lastPage });
    } else {
      for (let x = 1; x <= 4; x++) {
        if (props.lastPage % 5 == x) {
          setNum({
            first_num: props.lastPage - x + 1,
            last_num: props.lastPage,
          });
        }
      }
    }
    setActive(props.lastPage);
    props.setSearchParams({ page: props.lastPage });
  };

  return (
    <>
      <Pagination>
        {num.first_num == 1 ? null : (
          <>
            <Pagination.First onClick={onClickFirst} />
            <Pagination.Prev onClick={onClickPrev} />
          </>
        )}
        {items}
        {num.last_num == props.lastPage ? null : (
          <>
            <Pagination.Next onClick={onClickNext} />
            <Pagination.Last onClick={onClickLast} />
          </>
        )}
      </Pagination>
    </>
  );
};

export default PageNum;
