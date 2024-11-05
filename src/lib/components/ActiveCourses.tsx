'use client';

import { HStack, Icon, Stack, Image, Text } from '@chakra-ui/react';
import React, { Component } from 'react';
import Slider from 'react-slick';
import { addRandomSoftColorsToEvents } from '../helpers/paths';
import { LuClock } from 'react-icons/lu';
import { BsBook } from 'react-icons/bs';
import { GoPlus } from 'react-icons/go';
import { useRouter } from 'next/navigation';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ActiveCourses({ data }: any) {
  const router = useRouter();
  var settings = {
    dots: false,
    infinite: data?.length > 4 ? true : false,
    arrow: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: data?.length > 4 ? true : false,
    autoplaySpeed: 0,
    speed: 5000,
    pauseOnHover: false,
    cssEase: 'linear',
    useTransition: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  console.log(data);
  return (
    <Stack w={'100%'} spacing={10} justifyContent={'flex-start'}>
      {data?.length === 0 ? (
        <Stack
          p="6"
          display={'flex'}
          flexDirection={'row'}
          h={'177px'}
          justifyContent={'center'}
          alignItems={'center'}
          borderWidth={1}
          borderStyle={'dashed'}
          borderRadius="25px"
          w={'240px'}
          borderColor={'rgba(0, 0, 0, 0.75)'}
          onClick={() => router.push(`/student/book-session`)}
        >
          <Icon as={GoPlus} />
          <Text
            fontSize="18px"
            textAlign={'center'}
            color={'rgba(0, 0, 0, 0.5)'}
          >
            Add Course
          </Text>
        </Stack>
      ) : (
        <Slider {...settings} className="center">
          {addRandomSoftColorsToEvents(data)?.map(
            (item: any, index: number) => (
              <div key={index}>
                <Stack
                  bg={item?.color}
                  p="6"
                  display={'flex'}
                  flexDirection={'column'}
                  h={'177px'}
                  w={'95%'}
                  mx={'30px'}
                  justifyContent={'flex-start'}
                  alignItems={'flex-start'}
                  borderRadius="md"
                >
                  <Image
                    src="/images/two.svg"
                    bg={'white'}
                    w={6}
                    h={6}
                    p={1}
                    borderRadius={'50%'}
                    alt="active"
                  />
                  <Text
                    mt={2}
                    fontSize="16px"
                    fontWeight={300}
                    color={'#161736'}
                  >
                    {item?.subject?.name || ''}
                  </Text>
                  <HStack
                    bg={'#FCF9FF'}
                    borderRadius={'11px'}
                    py={3}
                    px={3}
                    w={'126px'}
                    mt={2}
                  >
                    <HStack gap={2}>
                      <Icon as={BsBook} color={'#161736'} />
                      <Text color={'#161736'}>
                        {item?.subject?.assignment || 0}
                      </Text>
                    </HStack>
                    <HStack>
                      <Icon as={LuClock} color={'#161736'} />
                      <Text color={'#161736'}>{item?.subject?.time}h</Text>
                    </HStack>
                  </HStack>
                </Stack>
              </div>
            )
          )}
        </Slider>
      )}
    </Stack>
  );
}

export default ActiveCourses;
