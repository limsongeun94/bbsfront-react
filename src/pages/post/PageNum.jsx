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
      setNum({
        first_num: num.first_num - 5,
        last_num: num.last_num - 5,
      });
    }
  };

  const onClickNext = () => {
    if (num.last_num == props.lastPage) {
      return;
    } else {
      setNum({
        first_num: num.first_num + 5,
        last_num:
          props.lastPage < num.last_num + 5 ? props.lastPage : num.last_num + 5,
        // props.lastPage가 num + 5 보다 작으면 props.lastPage로 되게.
      });
    }
  };

  const onClickFirst = () => {
    setNum({
      first_num: 1,
      last_num:
        props.lastPage < num.last_num + 5 ? props.lastPage : num.last_num + 5,
    });
    setActive(1);
  };

  const onClickLast = () => {
    setNum({
      first_num: props.lastPage < num.last_num + 5 ? 1 : num.last_num - 4,
      last_num: props.lastPage,
    });
    setActive(props.lastPage);
  };

  return (
    <>
      <Pagination>
        <Pagination.First onClick={onClickFirst} /> {/* 맨 첫번째 */}
        <Pagination.Prev onClick={onClickPrev} /> {/* 첫번째에서 -1 ~ -5 */}
        {items}
        <Pagination.Next onClick={onClickNext} /> {/* 마지막에서 +1 ~ +5 */}
        <Pagination.Last onClick={onClickLast} /> {/* 맨 마지막 */}
      </Pagination>
    </>
  );
};

export default PageNum;
