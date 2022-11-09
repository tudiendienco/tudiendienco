import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Paper, SpeedDial, SpeedDialAction, TextField, Typography } from '@mui/material';
import { Settings, Add, Edit, RemoveRedEye } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import '../Dictionary/style.css';
import CreateDictionary from './components/CreateDictionary';
import UpdateDictionary from './components/UpdateDictionary';
import schema from './validation/index';
import dictionaryAPI from '../../api/dictionaryAPI';
import { BASE_URL } from '../../components/constant';
import { color } from '@mui/system';
import DetailDictionary from './components/DetailDictionary';

// const data = [
//     { title: 'The Shawshank Redemption', year: 1994 },
//     { title: 'The Godfather', year: 1972 },
//     { title: 'The Godfather: Part II', year: 1974 },
//     { title: 'The Dark Knight', year: 2008 },
//     { title: '12 Angry Men', year: 1957 },
//     { title: "Schindler's List", year: 1993 },
//     { title: 'Pulp Fiction', year: 1994 },
//     {
//         title: 'The Lord of the Rings: The Return of the King',
//         year: 2003,
//     },
//     { title: 'The Good, the Bad and the Ugly', year: 1966 },
//     { title: 'Fight Club', year: 1999 },
//     {
//         title: 'The Lord of the Rings: The Fellowship of the Ring',
//         year: 2001,
//     },
//     {
//         title: 'Star Wars: Episode V - The Empire Strikes Back',
//         year: 1980,
//     },
//     { title: 'Forrest Gump', year: 1994 },
//     { title: 'Inception', year: 2010 },
//     {
//         title: 'The Lord of the Rings: The Two Towers',
//         year: 2002,
//     },
//     { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
//     { title: 'Goodfellas', year: 1990 },
//     { title: 'The Matrix', year: 1999 },
//     { title: 'Seven Samurai', year: 1954 },
//     {
//         title: 'Star Wars: Episode IV - A New Hope',
//         year: 1977,
//     },
//     { title: 'City of God', year: 2002 },
//     { title: 'Se7en', year: 1995 },
//     { title: 'The Silence of the Lambs', year: 1991 },
//     { title: "It's a Wonderful Life", year: 1946 },
//     { title: 'Life Is Beautiful', year: 1997 },
//     { title: 'The Usual Suspects', year: 1995 },
//     { title: 'Léon: The Professional', year: 1994 },
//     { title: 'Spirited Away', year: 2001 },
//     { title: 'Saving Private Ryan', year: 1998 },
//     { title: 'Once Upon a Time in the West', year: 1968 },
//     { title: 'American History X', year: 1998 },
//     { title: 'Interstellar', year: 2014 },
//     { title: 'Casablanca', year: 1942 },
//     { title: 'City Lights', year: 1931 },
//     { title: 'Psycho', year: 1960 },
//     { title: 'The Green Mile', year: 1999 },
//     { title: 'The Intouchables', year: 2011 },
//     { title: 'Modern Times', year: 1936 },
//     { title: 'Raiders of the Lost Ark', year: 1981 },
//     { title: 'Rear Window', year: 1954 },
//     { title: 'The Pianist', year: 2002 },
//     { title: 'The Departed', year: 2006 },
//     { title: 'Terminator 2: Judgment Day', year: 1991 },
//     { title: 'Back to the Future', year: 1985 },
//     { title: 'Whiplash', year: 2014 },
//     { title: 'Gladiator', year: 2000 },
//     { title: 'Memento', year: 2000 },
//     { title: 'The Prestige', year: 2006 },
//     { title: 'The Lion King', year: 1994 },
//     { title: 'Apocalypse Now', year: 1979 },
//     { title: 'Alien', year: 1979 },
//     { title: 'Sunset Boulevard', year: 1950 },
//     {
//         title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
//         year: 1964,
//     },
//     { title: 'The Great Dictator', year: 1940 },
//     { title: 'Cinema Paradiso', year: 1988 },
//     { title: 'The Lives of Others', year: 2006 },
//     { title: 'Grave of the Fireflies', year: 1988 },
//     { title: 'Paths of Glory', year: 1957 },
//     { title: 'Django Unchained', year: 2012 },
//     { title: 'The Shining', year: 1980 },
//     { title: 'WALL·E', year: 2008 },
//     { title: 'American Beauty', year: 1999 },
//     { title: 'The Dark Knight Rises', year: 2012 },
//     { title: 'Princess Mononoke', year: 1997 },
//     { title: 'Aliens', year: 1986 },
//     { title: 'Oldboy', year: 2003 },
//     { title: 'Once Upon a Time in America', year: 1984 },
//     { title: 'Witness for the Prosecution', year: 1957 },
//     { title: 'Das Boot', year: 1981 },
//     { title: 'Citizen Kane', year: 1941 },
//     { title: 'North by Northwest', year: 1959 },
//     { title: 'Vertigo', year: 1958 },
//     {
//         title: 'Star Wars: Episode VI - Return of the Jedi',
//         year: 1983,
//     },
//     { title: 'Reservoir Dogs', year: 1992 },
//     { title: 'Braveheart', year: 1995 },
//     { title: 'M', year: 1931 },
//     { title: 'Requiem for a Dream', year: 2000 },
//     { title: 'Amélie', year: 2001 },
//     { title: 'A Clockwork Orange', year: 1971 },
//     { title: 'Like Stars on Earth', year: 2007 },
//     { title: 'Taxi Driver', year: 1976 },
//     { title: 'Lawrence of Arabia', year: 1962 },
//     { title: 'Double Indemnity', year: 1944 },
//     {
//         title: 'Eternal Sunshine of the Spotless Mind',
//         year: 2004,
//     },
//     { title: 'Amadeus', year: 1984 },
//     { title: 'To Kill a Mockingbird', year: 1962 },
//     { title: 'Toy Story 3', year: 2010 },
//     { title: 'Logan', year: 2017 },
//     { title: 'Full Metal Jacket', year: 1987 },
//     { title: 'Dangal', year: 2016 },
//     { title: 'The Sting', year: 1973 },
//     { title: '2001: A Space Odyssey', year: 1968 },
//     { title: "Singin' in the Rain", year: 1952 },
//     { title: 'Toy Story', year: 1995 },
//     { title: 'Bicycle Thieves', year: 1948 },
//     { title: 'The Kid', year: 1921 },
//     { title: 'Inglourious Basterds', year: 2009 },
//     { title: 'Snatch', year: 2000 },
//     { title: '3 Idiots', year: 2009 },
//     { title: 'Monty Python and the Holy Grail', year: 1975 },
// ];

function Dictionary() {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestion] = useState([]);
    const [word, setWord] = useState();
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [data, setData] = useState([])
    const [isRender, setIsRender] = useState(true)
    const [valid, setValid] = useState(true)

    const getAll = async () => {
        try {
            const response = await axios.get(BASE_URL + '/all');
            console.log(response.data.data)
            setData(response.data.data)
        } catch (error) {
            console.warn('Failed to get translator list')
        }
    }

    useEffect(() => {
        isRender && getAll()
        setIsRender(false)
    }, [isRender, data])

    const onChange = (event) => {
        setValue(event.target.value);
        if (event.target.value === '') {
            setWord();
        }
        let matches = [];
        if (event.target.value.length > 0) {
            matches = data.filter((item) => {
                const regex = new RegExp(`${event.target.value}`, 'gi');
                return item.originalWord.match(regex);
            });
        }
        setSuggestion(matches);
    };

    const onSearch = (searchTerm) => {
        setValue(searchTerm);
        // our api to fetch the search result
        var _word = data.filter((item) => {
            return item.originalWord === searchTerm;
        })[0];
        console.log(_word);
        if (_word) {
            console.log('Found!!');
            setValid(true)
            setWord(_word);
        } else {
            console.log('Not Found!!');
            setValid(false)
            setWord();
        }

        console.log('search ', searchTerm);
    };

    const onHandleUpdate = (value) => {
        console.log(data, value)
        var _word = data.filter((item) => {
            return item.originalWord === value.originalWord;
        })[0];
        var newWord = { ...value, id: _word.id }
        console.log(_word, newWord)
        setWord(newWord);
    }

    return (
        <Container>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', position: 'sticky', top: 0 }}>
                <Box sx={{ width: '70%', bgcolor: 'white' }}>
                    <TextField
                        value={value}
                        onChange={onChange}
                        variant="outlined"
                        size="large"
                        fullWidth
                        placeholder="Nhập để tìm kiếm..."
                        onBlur={() => {
                            setTimeout(() => {
                                setSuggestion([]);
                            }, 100);
                        }}

                    />
                    <Box sx={{ width: '70%', position: 'absolute' }}>
                        <Box className="dropdown">
                            {suggestions &&
                                suggestions.slice(0, 10).map((item) => (
                                    <Box onClick={() => setValue(item.originalWord)} className="dropdown-row" key={item.originalWord}>
                                        {item.originalWord}
                                    </Box>
                                ))}
                        </Box>
                    </Box>

                </Box>
                <Box sx={{ width: '30%', mt: 1 }}>
                    <Button variant="outlined" onClick={() => onSearch(value)} size="large" sx={{ bgcolor: 'lightblue' }}>
                        {' '}
                        Tìm kiếm{' '}
                    </Button>
                </Box>
            </Box>
            {/* <Container sx={{ p: '0px !important', position: 'relative' }}>
                <Box sx={{ width: '70%', position: 'absolute' }}>
                    <Box className="dropdown">
                        {suggestions &&
                            suggestions.slice(0, 10).map((item) => (
                                <Box onClick={() => setValue(item.originalWord)} className="dropdown-row" key={item.originalWord}>
                                    {item.originalWord}
                                </Box>
                            ))}
                    </Box>
                </Box>
            </Container> */}
            <Paper elevation={2} sx={{ mt: 1, minHeight: '100vh', p: 5, textAlign: 'left' }}>
                {word && (
                    <>
                        <Typography>[<strong style={{ color: 'green' }}>Gốc</strong>]: {word.originalWord}  [<strong style={{ color: 'red' }}>{word.chWord}</strong>]</Typography>
                        <Typography>[<strong style={{ color: 'orange' }}>Dịch</strong>]: {word.translateWord}</Typography>
                        <Typography>[<strong style={{ color: 'purple' }}>Giải</strong>]: {word.description.split('\n').map((item, index) => {
                            return (
                                <strong key={index}>
                                    {item}
                                    <br />
                                </strong>
                            );
                        }
                        )}  </Typography>
                    </>
                )}
                {valid ? null : <Typography><strong style={{ color: 'red' }}>Không có kết quả phù hợp!</strong></Typography>}
            </Paper>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: '2rem', right: '2rem' }}
                icon={<Settings />}
            >
                <SpeedDialAction
                    key="Xem chi tiết"
                    icon={<RemoveRedEye />}
                    tooltipTitle="Xem chi tiết"
                    onClick={() => setOpenDetail(true)}
                />
                <SpeedDialAction
                    key="Thêm mới"
                    icon={<Add />}
                    tooltipTitle="Thêm mới"
                    onClick={() => setOpenAdd(true)}
                />
                {word && (
                    <SpeedDialAction
                        key="Chỉnh sửa"
                        icon={<Edit />}
                        tooltipTitle="Chỉnh sửa"
                        onClick={() => setOpenEdit(true)}
                    />
                )}
            </SpeedDial>
            <CreateDictionary
                open={openAdd}
                handleClose={() => {
                    setOpenAdd(false);
                    setIsRender(true);
                }}
                title="Thêm từ mới"
            />
            <UpdateDictionary
                open={openEdit}
                handleClose={() => {
                    setOpenEdit(false);
                    setIsRender(true);
                }}
                handleUpdate={onHandleUpdate}
                title="Chỉnh sửa" data={word} />
            <DetailDictionary
                open={openDetail}
                handleClose={() => {
                    setOpenDetail(false);
                }}
                title="Danh sách"
                data={data} />
        </Container>
    );
}

export default Dictionary;
