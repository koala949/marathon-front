import DoneImg from './no-article.png';

export default function() {
  return (
    <div
      style={{
        minHeight: 150,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src={DoneImg} alt="" />
      <span
        style={{
          fontSize: '20px',
          fontWeight: '500',
          marginTop: 20,
        }}
      >
        填好啦~ (°▽°)ﾉ
      </span>
    </div>
  );
}
