import ReactConfetti from 'react-confetti';
import DraftStatusTable from '../components/DraftStatusTable';
import '../styles/routes/DraftStatus.scss';

export default function DraftStatus() {
  return (
    <div className="draft-status section">
      <ReactConfetti
        numberOfPieces={1500}
        recycle={false}
        confettiSource={{ x: 0, y: -30, w: window.innerWidth, h: 20 }}
        colors={
          Date.now() % 2
            ? ['#ffffff', '#333399']
            : [
                '#f44336',
                '#e91e63',
                '#9c27b0',
                '#673ab7',
                '#3f51b5',
                '#2196f3',
                '#03a9f4',
                '#00bcd4',
                '#009688',
                '#4CAF50',
                '#8BC34A',
                '#CDDC39',
                '#FFEB3B',
                '#FFC107',
                '#FF9800',
                '#FF5722',
                '#795548',
              ]
        }
      />
      <div className="title">Draft Statuses</div>
      <a className="unit-3-article" href="/best-unit">
        <div>Unit 3 has finished its statements! Read more.</div>
      </a>
      <DraftStatusTable />
    </div>
  );
}
