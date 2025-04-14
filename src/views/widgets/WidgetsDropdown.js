import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { DatePicker } from 'antd'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import CustomOption from '../../components/header/SelectInput'
import { Bar } from 'react-chartjs-2'
import Select from 'react-select'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
)
const { RangePicker } = DatePicker

const ITEMS_PER_LOAD = 10
const districtSummaryData = [
  {
    district: 'Khordha',
    2025: {
      January: {
        'Number of Blocks': '112',
        'Number of Clusters': '1,800',
        'Number of Groups': '1,400',
        'Total Students': '16,000',
        'Total Schools': '410',
        'Total Contact Numbers': '13,000',
        classWiseStudents: {
          class1: 60,
          class2: 65,
          class3: 70,
          class4: 75,
          class5: 80,
          class6: 60,
          class7: 50,
          class8: 60,
          class9: 70,
          class10: 70,
        },
      },
      February: {
        'Number of Blocks': '112',
        'Number of Clusters': '1,800',
        'Number of Groups': '1,400',
        'Total Students': '16,500',
        'Total Schools': '415',
        'Total Contact Numbers': '13,200',
        'Weekly Class wise Content Shared (Classes 1 to 10)': '220',
        classWiseStudents: {
          class1: 60,
          class2: 65,
          class3: 70,
          class4: 75,
          class5: 80,
          class6: 60,
          class7: 50,
          class8: 60,
          class9: 70,
          class10: 70,
        },
      },
      March: {
        'Number of Blocks': '112',
        'Number of Clusters': '1,800',
        'Number of Groups': '1,400',
        'Total Students': '17,000',
        'Total Schools': '420',
        'Total Contact Numbers': '13,500',
        classWiseStudents: {
          class1: 60,
          class2: 65,
          class3: 70,
          class4: 75,
          class5: 80,
          class6: 60,
          class7: 50,
          class8: 60,
          class9: 70,
          class10: 70,
        },
      },
      April: {
        'Number of Blocks': '112',
        'Number of Clusters': '1,800',
        'Number of Groups': '1,400',
        'Total Students': '17,500',
        'Total Schools': '425',
        'Total Contact Numbers': '13,700',
        classWiseStudents: {
          class1: 60,
          class2: 65,
          class3: 70,
          class4: 75,
          class5: 80,
          class6: 60,
          class7: 50,
          class8: 60,
          class9: 70,
          class10: 70,
        },
      },
    },
  },
  {
    district: 'Cuttack',
    2025: {
      January: {
        'Number of Blocks': '95',
        'Number of Clusters': '1,600',
        'Number of Groups': '1,300',
        'Total Students': '15,000',
        'Total Schools': '400',
        'Total Contact Numbers': '12,500',
        classWiseStudents: {
          class1: 55,
          class2: 60,
          class3: 65,
          class4: 70,
          class5: 75,
          class6: 55,
          class7: 50,
          class8: 55,
          class9: 65,
          class10: 65,
        },
      },
      February: {
        'Number of Blocks': '95',
        'Number of Clusters': '1,600',
        'Number of Groups': '1,300',
        'Total Students': '15,400',
        'Total Schools': '405',
        'Total Contact Numbers': '12,700',
        'Weekly Class wise Content Shared (Classes 1 to 10)': '210',
        classWiseStudents: {
          class1: 55,
          class2: 60,
          class3: 65,
          class4: 70,
          class5: 75,
          class6: 55,
          class7: 50,
          class8: 55,
          class9: 65,
          class10: 65,
        },
      },
      March: {
        'Number of Blocks': '95',
        'Number of Clusters': '1,600',
        'Number of Groups': '1,300',
        'Total Students': '15,800',
        'Total Schools': '410',
        'Total Contact Numbers': '12,900',
        classWiseStudents: {
          class1: 55,
          class2: 60,
          class3: 65,
          class4: 70,
          class5: 75,
          class6: 55,
          class7: 50,
          class8: 55,
          class9: 65,
          class10: 65,
        },
      },
      April: {
        'Number of Blocks': '95',
        'Number of Clusters': '1,600',
        'Number of Groups': '1,300',
        'Total Students': '16,200',
        'Total Schools': '415',
        'Total Contact Numbers': '13,100',
        classWiseStudents: {
          class1: 55,
          class2: 60,
          class3: 65,
          class4: 70,
          class5: 75,
          class6: 55,
          class7: 50,
          class8: 55,
          class9: 65,
          class10: 65,
        },
      },
    },
  },
  {
    district: 'Puri',
    2025: {
      January: {
        'Number of Blocks': '90',
        'Number of Clusters': '1,500',
        'Number of Groups': '1,200',
        'Total Students': '14,000',
        'Total Schools': '380',
        'Total Contact Numbers': '12,000',
        classWiseStudents: {
          class1: 50,
          class2: 55,
          class3: 60,
          class4: 65,
          class5: 70,
          class6: 50,
          class7: 45,
          class8: 50,
          class9: 60,
          class10: 60,
        },
      },
      February: {
        'Number of Blocks': '90',
        'Number of Clusters': '1,500',
        'Number of Groups': '1,200',
        'Total Students': '14,400',
        'Total Schools': '385',
        'Total Contact Numbers': '12,200',
        'Weekly Class wise Content Shared (Classes 1 to 10)': '200',
        classWiseStudents: {
          class1: 50,
          class2: 55,
          class3: 60,
          class4: 65,
          class5: 70,
          class6: 50,
          class7: 45,
          class8: 50,
          class9: 60,
          class10: 60,
        },
      },
      March: {
        'Number of Blocks': '90',
        'Number of Clusters': '1,500',
        'Number of Groups': '1,200',
        'Total Students': '14,800',
        'Total Schools': '390',
        'Total Contact Numbers': '12,400',
        classWiseStudents: {
          class1: 50,
          class2: 55,
          class3: 60,
          class4: 65,
          class5: 70,
          class6: 50,
          class7: 45,
          class8: 50,
          class9: 60,
          class10: 60,
        },
      },
      April: {
        'Number of Blocks': '90',
        'Number of Clusters': '1,500',
        'Number of Groups': '1,200',
        'Total Students': '15,200',
        'Total Schools': '395',
        'Total Contact Numbers': '12,600',
        classWiseStudents: {
          class1: 50,
          class2: 55,
          class3: 60,
          class4: 65,
          class5: 70,
          class6: 50,
          class7: 45,
          class8: 50,
          class9: 60,
          class10: 60,
        },
      },
    },
  },
  {
    district: 'Balasore',
    2025: {
      January: {
        'Number of Blocks': '105',
        'Number of Clusters': '1,700',
        'Number of Groups': '1,350',
        'Total Students': '15,500',
        'Total Schools': '400',
        'Total Contact Numbers': '12,800',
        classWiseStudents: {
          class1: 58,
          class2: 62,
          class3: 67,
          class4: 72,
          class5: 77,
          class6: 58,
          class7: 48,
          class8: 58,
          class9: 68,
          class10: 68,
        },
      },
      February: {
        'Number of Blocks': '105',
        'Number of Clusters': '1,700',
        'Number of Groups': '1,350',
        'Total Students': '15,800',
        'Total Schools': '405',
        'Total Contact Numbers': '13,000',
        'Weekly Class wise Content Shared (Classes 1 to 10)': '210',
        classWiseStudents: {
          class1: 58,
          class2: 62,
          class3: 67,
          class4: 72,
          class5: 77,
          class6: 58,
          class7: 48,
          class8: 58,
          class9: 68,
          class10: 68,
        },
      },
      March: {
        'Number of Blocks': '105',
        'Number of Clusters': '1,700',
        'Number of Groups': '1,350',
        'Total Students': '16,200',
        'Total Schools': '410',
        'Total Contact Numbers': '13,200',
        classWiseStudents: {
          class1: 58,
          class2: 62,
          class3: 67,
          class4: 72,
          class5: 77,
          class6: 58,
          class7: 48,
          class8: 58,
          class9: 68,
          class10: 68,
        },
      },
      April: {
        'Number of Blocks': '105',
        'Number of Clusters': '1,700',
        'Number of Groups': '1,350',
        'Total Students': '16,600',
        'Total Schools': '415',
        'Total Contact Numbers': '13,400',
        classWiseStudents: {
          class1: 58,
          class2: 62,
          class3: 67,
          class4: 72,
          class5: 77,
          class6: 58,
          class7: 48,
          class8: 58,
          class9: 68,
          class10: 68,
        },
      },
    },
  },
  {
    district: 'Ganjam',
    2025: {
      January: {
        'Number of Blocks': '100',
        'Number of Clusters': '1,700',
        'Number of Groups': '1,300',
        'Total Students': '15,000',
        'Total Schools': '395',
        'Total Contact Numbers': '12,600',
        classWiseStudents: {
          class1: 56,
          class2: 60,
          class3: 65,
          class4: 70,
          class5: 75,
          class6: 56,
          class7: 48,
          class8: 56,
          class9: 66,
          class10: 66,
        },
      },
      February: {
        'Number of Blocks': '100',
        'Number of Clusters': '1,700',
        'Number of Groups': '1,300',
        'Total Students': '15,400',
        'Total Schools': '400',
        'Total Contact Numbers': '12,800',
        'Weekly Class wise Content Shared (Classes 1 to 10)': '200',
        classWiseStudents: {
          class1: 56,
          class2: 60,
          class3: 65,
          class4: 70,
          class5: 75,
          class6: 56,
          class7: 48,
          class8: 56,
          class9: 66,
          class10: 66,
        },
      },
      March: {
        'Number of Blocks': '100',
        'Number of Clusters': '1,700',
        'Number of Groups': '1,300',
        'Total Students': '15,800',
        'Total Schools': '405',
        'Total Contact Numbers': '13,000',
        classWiseStudents: {
          class1: 56,
          class2: 60,
          class3: 65,
          class4: 70,
          class5: 75,
          class6: 56,
          class7: 48,
          class8: 56,
          class9: 66,
          class10: 66,
        },
      },
      April: {
        'Number of Blocks': '100',
        'Number of Clusters': '1,700',
        'Number of Groups': '1,300',
        'Total Students': '16,200',
        'Total Schools': '410',
        'Total Contact Numbers': '13,200',
        classWiseStudents: {
          class1: 56,
          class2: 60,
          class3: 65,
          class4: 70,
          class5: 75,
          class6: 56,
          class7: 48,
          class8: 56,
          class9: 66,
          class10: 66,
        },
      },
    },
  },
]

const Dashboard = (props) => {
  const [filters, setFilters] = useState({
    district: '',
    block: '',
    school: '',
    cluster: '',
    class: '',
    trainingDateFrom: '',
    trainingDateTo: '',
  })

  console.log('filters', filters)
  const [selectedRange, setSelectedRange] = useState([])
  const [stDate, setStDate] = useState()
  const [NdDate, setNdDate] = useState()
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(null)

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD)
  const containerRef = useRef(null)

  const handleScroll = () => {
    const container = containerRef.current
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
      setVisibleCount((prev) => Math.min(prev + ITEMS_PER_LOAD, districtSummaryData.length))
    }
  }

  useEffect(() => {
    const current = containerRef.current
    if (current) current.addEventListener('scroll', handleScroll)
    return () => {
      if (current) current.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (stDate && NdDate) {
      setFilters((prev) => ({
        ...prev,
        trainingDateFrom: stDate,
        trainingDateTo: NdDate,
      }))
    }
  }, [stDate, NdDate])

  const districts = [
    { label: 'Puri', value: 'puri' },
    { label: 'Khordha', value: 'khordha' },
    { label: 'Cuttack', value: 'cuttack' },

    { label: 'Balasore', value: 'balasore' },
    { label: 'Ganjam', value: 'ganjam' },
  ]

  const blocksData = {
    khordha: [
      { label: 'Bhubaneswar', value: 'bhubaneswar' },
      { label: 'Bolangir', value: 'bolangir' },
    ],
    cuttack: [
      { label: 'Banki', value: 'banki' },
      { label: 'Niali', value: 'niali' },
    ],
    puri: [
      { label: 'Nimapara', value: 'nimapara' },
      { label: 'Satyabadi', value: 'satyabadi' },
    ],
    balasore: [
      { label: 'Nilagiri', value: 'nilagiri' },
      { label: 'Soro', value: 'soro' },
    ],
    ganjam: [
      { label: 'Chhatrapur', value: 'chhatrapur' },
      { label: 'Aska', value: 'aska' },
    ],
  }

  const clustersData = {
    nimapara: [
      { label: 'CHHANIJANGA NODAL UPS', value: 'chhanijangaNodalUps' },
      { label: 'PABITRA GOVT. HIGH SCHOOL , MANIJANG', value: 'pabitraGovtHighSchoolManijang' },
      { label: 'BHATABANDHA NODAL UPS', value: 'bhatabandhaNodalUps' },
      { label: 'AMARANG UGUPS', value: 'amarangUgups' },
      { label: 'TULASIPUR PS', value: 'tulasipurPs' },
      { label: 'BAMANAL PS', value: 'bamanalPs' },
      { label: 'GOPINATHPATNA PS', value: 'gopinathpatnaPs' },
      { label: 'KADUA', value: 'kadua' },
      { label: 'KETAKIPATNA', value: 'ketakipatna' },
      { label: 'SUKAL', value: 'sukal' },
      { label: 'NUA SOMESWARPUR', value: 'nuaSomeswarpur' },
      { label: 'BISWANATHAPUR', value: 'biswanathapur' },
      { label: 'SUANLO', value: 'suanlo' },
      { label: 'BALIHUDA', value: 'balihuda' },
      { label: 'SRI RAMACHANDRAPUR', value: 'sriRamachandrapur' },
      { label: 'MITEIPUR PROJECT UPS', value: 'miteipurProjectUps' },
      { label: 'DHALESWAR UG UPS', value: 'dhaleswarUgUps' },
      { label: 'SAILO NODAL UPS', value: 'sailoNodalUps' },
      { label: 'BAPUJI NODAL UPS, NAGABASTA', value: 'bapujiNodalUpsNagabasta' },
      { label: 'NILAKANTHESWAR MP HS, DIGHALO', value: 'nilakantheswarMpHsDighalo' },
      { label: 'BHADARO PS', value: 'bhadaroPs' },
      { label: 'OILIKANA UG UPS', value: 'oilikanaUgUps' },
      { label: 'KOTHAKUSANGA PS', value: 'kothakusangaPs' },
      { label: 'SEVAKSAHI', value: 'sevaksahi' },
      { label: 'BAINSIBADI', value: 'bainsibadi' },
      { label: 'PURUNABUDHAKERA', value: 'purunabudhakera' },
      { label: 'BALANGA GOVT. UPS', value: 'balangaGovtUps' },
      { label: 'BHANAPUR UGUPS', value: 'bhanapurUgups' },
      { label: 'BHAGABATIPUR NODAL UPS', value: 'bhagabatipurNodalUps' },
      { label: 'BISHNUPUR NODAL UPS', value: 'bishnupurNodalUps' },
      { label: 'ODAGUAN PROJECT UPS', value: 'odaguanProjectUps' },
      { label: 'PANCHAYAT UPS, UCHHUPUR', value: 'panchayatUpsUchhupur' },
      { label: 'RENCH SASAN PS', value: 'renchSasanPs' },
    ],
    satyabadi: [
      { label: 'KADUA', value: 'kadua' },
      { label: 'KETAKIPATNA', value: 'ketakipatna' },
      { label: 'SUKAL', value: 'sukal' },
      { label: 'NUA SOMESWARPUR', value: 'nuaSomeswarpur' },
      { label: 'BISWANATHAPUR', value: 'biswanathapur' },
      { label: 'SUANLO', value: 'suanlo' },
      { label: 'BALIHUDA', value: 'balihuda' },
      { label: 'SRI RAMACHANDRAPUR', value: 'sriRamachandrapur' },
      { label: 'SEVAKSAHI', value: 'sevaksahi' },
      { label: 'BAINSIBADI', value: 'bainsibadi' },
    ],
    bhubaneswar: [
      { label: 'BBSR Cluster 1', value: 'bbsrCluster1' },
      { label: 'BBSR Cluster 2', value: 'bbsrCluster2' },
    ],
    banki: [
      { label: 'Banki Cluster 1', value: 'bankiCluster1' },
      { label: 'Banki Cluster 2', value: 'bankiCluster2' },
    ],
    krushnaprasad: [{ label: 'KP Cluster A', value: 'kpClusterA' }],
    chhatrapur: [{ label: 'Chatrapur Cluster 1', value: 'chatrapurCluster1' }],
    soro: [{ label: 'Soro Cluster X', value: 'soroClusterX' }],
  }

  const schoolsData = {
    kadua: [
      { label: 'AHAMADPUR PUPS', value: 'ahamadpurPups' },
      { label: 'BADAKANJIA PS', value: 'badakanjiaPs' },
    ],
    ketakipatna: [
      { label: 'ALANDAPADA PS', value: 'alandapadaPs' },
      { label: 'BADATOTA PS', value: 'badatotaPs' },
      { label: 'BAGALPUR PUPS', value: 'bagalpurPups' },
    ],
    sukal: [
      { label: 'ALISH PS', value: 'alishPs' },
      { label: 'ALISHPATNA PPS', value: 'alishpatnaPps' },
    ],
    nuaSomeswarpur: [{ label: 'ATHABATIA PS', value: 'athabatiaPs' }],
    biswanathapur: [
      { label: 'ATHAISH PS', value: 'athaishPs' },
      { label: 'BADAHAT PS', value: 'badahatPs' },
    ],
    suanlo: [
      { label: 'BADABASANTA PS', value: 'badabasantaPs' },
      { label: 'BADHEIKERA PS', value: 'badheikeraPs' },
    ],
    balihuda: [{ label: 'BADABHIMADASPUR PPS', value: 'badabhimadaspurPps' }],
    sriRamachandrapur: [{ label: 'BADABILASAHI PS', value: 'badabilasahiPs' }],
    sevaksahi: [{ label: 'BAGULAPARI PPS', value: 'bagulapariPps' }],
    bainsibadi: [
      { label: 'BAINSIBADI PS', value: 'bainsibadiPs' },
      { label: 'BAISHNAVASAHI PPS', value: 'baishnavasahiPps' },
    ],
    chhanijangaNodalUps: [{ label: 'ASHAPURANA PS', value: 'ashapuranaPs' }],
    miteipurProjectUps: [{ label: 'ANDHOTI PROJECT PS', value: 'andhotiProjectPs' }],
    dhaleswarUgUps: [{ label: 'ANGARAPADA PROJECT PS', value: 'angarapadaProjectPs' }],
    sailoNodalUps: [{ label: 'ANSALO CPS', value: 'ansaloCps' }],
    bapujiNodalUpsNagabasta: [{ label: 'ARILO PS', value: 'ariloPs' }],
    nilakantheswarMpHsDighalo: [{ label: 'ARISANDHA CPS', value: 'arisandhaCps' }],
    bhadaroPs: [{ label: 'ASHRAM SCHOOL, GARHITAPOKHARI', value: 'ashramSchoolGarhitapokhari' }],
    oilikanaUgUps: [{ label: 'BADAMACHHAPUR PROJECT UPS', value: 'badamachhapurProjectUps' }],
    kothakusangaPs: [{ label: 'BAKU PS', value: 'bakuPs' }],
    pabitraGovtHighSchoolManijang: [{ label: 'ALANDA HARIZAN PS', value: 'alandaHarizanPs' }],
    bhatabandhaNodalUps: [{ label: 'ALIPINGAL PROJECT UPS', value: 'alipingalProjectUps' }],
    amarangUgups: [{ label: 'AMARANGA UGUPS', value: 'amarangaUgups' }],
    tulasipurPs: [{ label: 'AMARESWAR GOVT. HIGH SCHOOL', value: 'amareswarGovtHighSchool' }],
    bamanalPs: [{ label: 'AMBILIHANA PS', value: 'ambilihanaPs' }],
    chhanijangaNodalUps: [
      { label: 'AMPORA PS', value: 'amporaPs' },
      { label: 'ANANTABASUDEV UPS', value: 'anantabasudevUps' },
    ],
    gopinathpatnaPs: [
      { label: 'AMUNIAPATANA PROJECT PS', value: 'amuniapatanaProjectPs' },
      { label: 'ANDHIASAHI PS', value: 'andhiasahiPs' },
    ],
    kadua: [{ label: 'AHAMADPUR PUPS', value: 'ahamadpurPups' }],
    ketakipatna: [{ label: 'ALANDAPADA PS', value: 'alandapadaPs' }],
    sukal: [
      { label: 'ALISH PS', value: 'alishPs' },
      { label: 'ALISHPATNA PPS', value: 'alishpatnaPps' },
    ],
    nuaSomeswarpur: [{ label: 'ATHABATIA PS', value: 'athabatiaPs' }],
    biswanathapur: [{ label: 'ATHAISH PS', value: 'athaishPs' }],
    bbsrCluster1: [
      { label: 'BBSR School 1', value: 'bbsrSchool1' },
      { label: 'BBSR School 2', value: 'bbsrSchool2' },
    ],
    bbsrCluster2: [{ label: 'BBSR School 3', value: 'bbsrSchool3' }],
    bankiCluster1: [{ label: 'Banki School A', value: 'bankiSchoolA' }],
    kpClusterA: [{ label: 'KP School X', value: 'kpSchoolX' }],
    soroClusterX: [{ label: 'Soro School Z', value: 'soroSchoolZ' }],
  }

  const dropdownStyle = {
    borderRadius: '10px',
    padding: '10px',
    border: '1px solid #b2ebf2',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 500,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  }
  const cardStyle = {
    background: '#e0f7f1',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    border: '2px solid #cceae4',
  }

  const customStyles = {
    control: (base) => ({
      ...base,
      ...dropdownStyle,
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  }
  const dateStyle = {
    height: 57,
    padding: '0 12px',
    border: '1px solid #b2ebf2',
    borderRadius: 10,
    fontSize: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  }
  const thStyle = {
    padding: '8px',
    textAlign: 'center',
    border: '1px solid #ddd',
    backgroundColor: '#f0f0f0',
  }

  const tdStyle = {
    padding: '8px',
    textAlign: 'center',
    border: '1px solid #ddd',
  }

  const renderRows = () => {
    return districtSummaryData.slice(0, visibleCount).map((row, idx) => {
      return Object.keys(row[2025]).map((month) => {
        const monthData = row[2025][month]
        return (
          <tr key={`${idx}-${month}`}>
            <td style={tdStyle}>{row.district}</td>
            <td style={tdStyle}>{row.block || 'N/A'}</td>{' '}
            {/* Assuming block data is not part of current data */}
            <td style={tdStyle}>{monthData['Number of Groups']}</td>
            <td style={tdStyle}>{monthData['Number of Clusters']}</td>
            <td style={tdStyle}>{monthData['Total Students']}</td>
            <td style={tdStyle}>{monthData['Total Schools']}</td>
            <td style={tdStyle}>{monthData['Total Contact Numbers']}</td>
            {Array.from({ length: 10 }, (_, i) => (
              <td key={i} style={tdStyle}>
                {monthData.classWiseStudents[`class${i + 1}`]}
              </td>
            ))}
          </tr>
        )
      })
    })
  }

  const handleDistrictChange = (selectedOption) => {
    setFilters({
      district: selectedOption?.value || '',
      block: '',
      cluster: '',
      school: '',
    })
    setSelectedYear(null)
    setSelectedMonth(null)
    setSelectedRange(null)
  }

  const handleBlockChange = (selectedOption) => {
    setFilters((prev) => ({
      ...prev,
      block: selectedOption?.value || '',
      cluster: '',
      school: '',
    }))
  }

  const handleClusterChange = (selectedOption) => {
    setFilters((prev) => ({
      ...prev,
      cluster: selectedOption?.value || '',
      school: '',
    }))
  }

  const handleSchoolChange = (selectedOption) => {
    setFilters((prev) => ({
      ...prev,
      school: selectedOption?.value || '',
    }))
  }
  const handleClassChange = (selectedOption) => {
    setFilters((prev) => ({
      ...prev,
      class: selectedOption?.value || '',
    }))
  }

  const handleRangeChange = (dates) => {
    setSelectedRange(dates)

    if (dates && dates.length === 2) {
      const start = dates[0]
      setSelectedYear(start.year())
      setSelectedMonth(start.format('MMMM')) // Gives "January", "February", etc.
    } else {
      setSelectedYear(null)
      setSelectedMonth(null)
    }
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 12 },
          boxWidth: 12,
        },
      },
      title: { display: false },
    },
    scales: {
      x: {
        ticks: { font: { size: 12 }, autoSkip: false, maxRotation: 90, minRotation: 45 },
      },
      y: {
        beginAtZero: true,
        ticks: { font: { size: 12 } },
      },
    },
  }
  const classOptions = Array.from({ length: 10 }, (_, i) => ({
    label: `Class ${i + 1}`,
    value: `Class${i + 1}`,
  }))

  const getDashboardFields = (filters) => {
    if (filters.class) {
      return [
        'Total Students',
        'Number of Content Read',
        'Videos Received',
        'Images Received',
        'Audios Received',
        'Two-way Interaction Messages',
      ]
    }

    if (filters.school) {
      return [
        'Class wise no of students',
        'Weekly Class wise Content Shared (Classes 1 to 10)',
        'Number of Content Shared',
        'Number of Content Read',
        'Videos Received',
        'Images Received',
        'Audios Received',
        'Two-way Interaction Messages',
      ]
    }

    if (filters.cluster) {
      return [
        'Total number of schools',
        'Number of Students',
        'Number of Groups',
        'Class wise no of students (1 to 10)',
        'Weekly Class wise Content Shared (Classes 1 to 10)',
        'Number of Content Shared',
        'Number of Content Read',
        'Videos Received',
        'Images Received',
        'Audios Received',
        'Two-way Interaction Messages',
      ]
    }

    if (filters.block) {
      return [
        'Total no of Schools',
        'Number of Students',
        'Number of Groups',
        'Class wise no of students (1 to 10)',
        'Weekly Class wise Content Shared (Classes 1 to 10)',
        'Number of Content Shared',
        'Number of Content Read',
        'Videos Received',
        'Images Received',
        'Audios Received',
        'Two-way Interaction Messages',
      ]
    }

    if (filters.district) {
      return [
        'Number of Blocks',
        'Number of Clusters',
        'Number of Groups',
        'Total Students',
        'Total Schools',
        'Number of Content Shared',
        'Weekly Class wise Content Shared (Classes 1 to 10)',
        'Number of Content Read',
        'Videos Received',
        'Images Received',
        'Audios Received',
        'Two-way Interaction Messages',
      ]
    }

    return [
      'Number of Districts',
      'Number of Blocks',
      'Number of Groups',
      'Total Students',
      'Total Schools',
      'Total Contact Numbers',
      'Number of Content Shared',
      'Weekly Class wise Content Shared (Classes 1 to 10)',
      'Number of Content Read',
      'Videos Received',
      'Images Received',
      'Audios Received',
      'Class wise Number of Students (Classes 1 to 10)',
      'Two-way Interaction Messages',
    ]
  }

  const dashboardValues = {
    'Number of Districts': '30',
    'Number of Blocks': '314',
    'Number of Clusters': '5,200',
    'Number of Groups': '4,200',
    'Total Students': '55,000',
    'Total Schools': '1,200',
    'Total Contact Numbers': '50,000',
    'Number of Content Shared': '9,823',
    'Weekly Class wise Content Shared (Classes 1 to 10)': '1,200',
    'Number of Content Read': '7,800',
    'Videos Received': '2,340',
    'Images Received': '1,200',
    'Audios Received': '890',
    'Class wise Number of Students (Classes 1 to 10)': 'Varies',
    'Class wise no of students (1 to 10)': 'Dynamic Count',
    'Total number of schools': '450',
    'Total no of Schools': '450',
    'Number of Students': '8,200',
    'Class wise no of students': 'Dynamic',
    'Two-way Interaction Messages': '3,200',
  }

  const dashboardValuesByRegion = {
    khordha: {
      2025: {
        January: {
          'Number of Blocks': '310',
          'Number of Clusters': '5,300',
          'Number of Groups': '4,500',
          'Total Students': '57,000',
          'Total Schools': '1,150',
          'Total Contact Numbers': '48,000',
          'Number of Content Shared': '8,700',
          'Weekly Class wise Content Shared (Classes 1 to 10)': '1,150',
          'Number of Content Read': '7,400',
          'Videos Received': '2,200',
          'Images Received': '1,150',
          'Audios Received': '860',
          'Class wise Number of Students (Classes 1 to 10)': 'Varies by class',
          'Class wise no of students (1 to 10)': 'Dynamic Count',
          'Total number of schools': '450',
          'Total no of Schools': '450',
          'Number of Students': '8,000',
          'Class wise no of students': 'Dynamic',
          'Two-way Interaction Messages': '3,000',
          class: {
            class1: {
              'Total Students': '1,000',
              'Number of Content Read': '850',
              'Videos Received': '300',
              'Images Received': '200',
              'Audios Received': '100',
              'Two-way Interaction Messages': '400',
            },
            class2: {
              'Total Students': '900',
              'Number of Content Read': '800',
              'Videos Received': '290',
              'Images Received': '190',
              'Audios Received': '90',
              'Two-way Interaction Messages': '350',
            },
          },
        },
        February: {
          'Number of Blocks': '312',
          'Number of Clusters': '5,350',
          'Number of Groups': '4,600',
          'Total Students': '58,500',
          'Total Schools': '1,160',
          'Total Contact Numbers': '49,000',
          'Number of Content Shared': '9,000',
          'Weekly Class wise Content Shared (Classes 1 to 10)': '1,180',
          'Number of Content Read': '7,800',
          'Videos Received': '2,250',
          'Images Received': '1,200',
          'Audios Received': '870',
          'Class wise Number of Students (Classes 1 to 10)': 'Updated',
          'Class wise no of students (1 to 10)': 'Dynamic Count',
          'Total number of schools': '455',
          'Total no of Schools': '455',
          'Number of Students': '8,100',
          'Class wise no of students': 'Dynamic',
          'Two-way Interaction Messages': '3,100',
          class: {
            class1: {
              'Total Students': '1,000',
              'Number of Content Read': '850',
              'Videos Received': '300',
              'Images Received': '200',
              'Audios Received': '100',
              'Two-way Interaction Messages': '400',
            },
            class2: {
              'Total Students': '900',
              'Number of Content Read': '800',
              'Videos Received': '290',
              'Images Received': '190',
              'Audios Received': '90',
              'Two-way Interaction Messages': '350',
            },
          },
        },
        March: {
          'Number of Blocks': '313',
          'Number of Clusters': '5,400',
          'Number of Groups': '4,700',
          'Total Students': '60,000',
          'Total Schools': '1,170',
          'Total Contact Numbers': '50,000',
          'Number of Content Shared': '9,400',
          'Weekly Class wise Content Shared (Classes 1 to 10)': '1,200',
          'Number of Content Read': '8,200',
          'Videos Received': '2,300',
          'Images Received': '1,250',
          'Audios Received': '880',
          'Class wise Number of Students (Classes 1 to 10)': 'Refreshed Data',
          'Class wise no of students (1 to 10)': 'Dynamic Count',
          'Total number of schools': '460',
          'Total no of Schools': '460',
          'Number of Students': '8,200',
          'Class wise no of students': 'Dynamic',
          'Two-way Interaction Messages': '3,150',
          class: {
            class1: {
              'Total Students': '1,000',
              'Number of Content Read': '850',
              'Videos Received': '300',
              'Images Received': '200',
              'Audios Received': '100',
              'Two-way Interaction Messages': '400',
            },
            class2: {
              'Total Students': '900',
              'Number of Content Read': '800',
              'Videos Received': '290',
              'Images Received': '190',
              'Audios Received': '90',
              'Two-way Interaction Messages': '350',
            },
          },
        },
        April: {
          'Number of Blocks': '314',
          'Number of Clusters': '5,500',
          'Number of Groups': '4,800',
          'Total Students': '61,500',
          'Total Schools': '1,180',
          'Total Contact Numbers': '51,000',
          'Number of Content Shared': '9,800',
          'Weekly Class wise Content Shared (Classes 1 to 10)': '1,220',
          'Number of Content Read': '8,600',
          'Videos Received': '2,400',
          'Images Received': '1,300',
          'Audios Received': '890',
          'Class wise Number of Students (Classes 1 to 10)': 'April Stats',
          'Class wise no of students (1 to 10)': 'Dynamic Count',
          'Total number of schools': '470',
          'Total no of Schools': '470',
          'Number of Students': '8,300',
          'Class wise no of students': 'Dynamic',
          'Two-way Interaction Messages': '3,200',
          class: {
            class1: {
              'Total Students': '1,000',
              'Number of Content Read': '850',
              'Videos Received': '300',
              'Images Received': '200',
              'Audios Received': '100',
              'Two-way Interaction Messages': '400',
            },
            class2: {
              'Total Students': '900',
              'Number of Content Read': '800',
              'Videos Received': '290',
              'Images Received': '190',
              'Audios Received': '90',
              'Two-way Interaction Messages': '350',
            },
          },
        },
      },
    },

    cuttack: {
      2025: {
        January: {
          'Number of Blocks': '290',
          'Number of Clusters': '3,800',
          'Number of Groups': '3,100',
          'Total Students': '45,000',
          'Total Schools': '900',
          'Total Contact Numbers': '37,000',
          'Number of Content Shared': '6,200',
          'Weekly Class wise Content Shared (Classes 1 to 10)': '980',
          'Number of Content Read': '6,000',
          'Videos Received': '1,800',
          'Images Received': '900',
          'Audios Received': '700',
          'Class wise Number of Students (Classes 1 to 10)': 'Even Distribution',
          'Class wise no of students (1 to 10)': 'Dynamic Count',
          'Total number of schools': '420',
          'Total no of Schools': '420',
          'Number of Students': '7,000',
          'Class wise no of students': 'Dynamic',
          'Two-way Interaction Messages': '2,400',
          class: {
            class1: {
              'Total Students': '1,000',
              'Number of Content Read': '850',
              'Videos Received': '300',
              'Images Received': '200',
              'Audios Received': '100',
              'Two-way Interaction Messages': '400',
            },
            class2: {
              'Total Students': '900',
              'Number of Content Read': '800',
              'Videos Received': '290',
              'Images Received': '190',
              'Audios Received': '90',
              'Two-way Interaction Messages': '350',
            },
          },
        },
        February: {
          'Number of Blocks': '292',
          'Number of Clusters': '3,900',
          'Number of Groups': '3,200',
          'Total Students': '46,500',
          'Total Schools': '920',
          'Total Contact Numbers': '38,000',
          'Number of Content Shared': '6,500',
          'Weekly Class wise Content Shared (Classes 1 to 10)': '1,000',
          'Number of Content Read': '6,200',
          'Videos Received': '1,850',
          'Images Received': '940',
          'Audios Received': '720',
          'Class wise Number of Students (Classes 1 to 10)': 'Balanced',
          'Class wise no of students (1 to 10)': 'Dynamic Count',
          'Total number of schools': '430',
          'Total no of Schools': '430',
          'Number of Students': '7,100',
          'Class wise no of students': 'Dynamic',
          'Two-way Interaction Messages': '2,500',
          class: {
            class1: {
              'Total Students': '1,000',
              'Number of Content Read': '850',
              'Videos Received': '300',
              'Images Received': '200',
              'Audios Received': '100',
              'Two-way Interaction Messages': '400',
            },
            class2: {
              'Total Students': '900',
              'Number of Content Read': '800',
              'Videos Received': '290',
              'Images Received': '190',
              'Audios Received': '90',
              'Two-way Interaction Messages': '350',
            },
          },
        },
        March: {
          'Number of Blocks': '293',
          'Number of Clusters': '4,000',
          'Number of Groups': '3,300',
          'Total Students': '48,000',
          'Total Schools': '940',
          'Total Contact Numbers': '39,000',
          'Number of Content Shared': '6,800',
          'Weekly Class wise Content Shared (Classes 1 to 10)': '1,020',
          'Number of Content Read': '6,400',
          'Videos Received': '1,900',
          'Images Received': '970',
          'Audios Received': '740',
          'Class wise Number of Students (Classes 1 to 10)': 'Varied',
          'Class wise no of students (1 to 10)': 'Dynamic Count',
          'Total number of schools': '440',
          'Total no of Schools': '440',
          'Number of Students': '7,200',
          'Class wise no of students': 'Dynamic',
          'Two-way Interaction Messages': '2,550',
          class: {
            class1: {
              'Total Students': '1,000',
              'Number of Content Read': '850',
              'Videos Received': '300',
              'Images Received': '200',
              'Audios Received': '100',
              'Two-way Interaction Messages': '400',
            },
            class2: {
              'Total Students': '900',
              'Number of Content Read': '800',
              'Videos Received': '290',
              'Images Received': '190',
              'Audios Received': '90',
              'Two-way Interaction Messages': '350',
            },
          },
        },
        April: {
          'Number of Blocks': '295',
          'Number of Clusters': '4,100',
          'Number of Groups': '3,400',
          'Total Students': '49,500',
          'Total Schools': '950',
          'Total Contact Numbers': '40,000',
          'Number of Content Shared': '7,100',
          'Weekly Class wise Content Shared (Classes 1 to 10)': '1,050',
          'Number of Content Read': '6,600',
          'Videos Received': '2,000',
          'Images Received': '1,000',
          'Audios Received': '760',
          'Class wise Number of Students (Classes 1 to 10)': 'Increasing',
          'Class wise no of students (1 to 10)': 'Dynamic Count',
          'Total number of schools': '450',
          'Total no of Schools': '450',
          'Number of Students': '7,300',
          'Class wise no of students': 'Dynamic',
          'Two-way Interaction Messages': '2,600',
          class: {
            class1: {
              'Total Students': '1,000',
              'Number of Content Read': '850',
              'Videos Received': '300',
              'Images Received': '200',
              'Audios Received': '100',
              'Two-way Interaction Messages': '400',
            },
            class2: {
              'Total Students': '900',
              'Number of Content Read': '800',
              'Videos Received': '290',
              'Images Received': '190',
              'Audios Received': '90',
              'Two-way Interaction Messages': '350',
            },
          },
        },
      },
    },

    puri: {
      2025: {
        January: {
          'Number of Blocks': '150',
          'Number of Clusters': '2,000',
          'Number of Groups': '1,600',
          'Total Students': '25,000',
          'Total Schools': '500',
          'Total Contact Numbers': '20,000',
          'Number of Content Shared': '4,000',
          'Weekly Class wise Content Shared (Classes 1 to 10)': '650',
          'Number of Content Read': '3,200',
          'Videos Received': '900',
          'Images Received': '500',
          'Audios Received': '300',
          'Class wise Number of Students (Classes 1 to 10)': 'Small Distribution',
          'Class wise no of students (1 to 10)': 'Dynamic Count',
          'Total number of schools': '250',
          'Total no of Schools': '250',
          'Number of Students': '4,000',
          'Class wise no of students': 'Dynamic',
          'Two-way Interaction Messages': '1,000',
          class: {
            class1: {
              'Total Students': '1,000',
              'Number of Content Read': '850',
              'Videos Received': '300',
              'Images Received': '200',
              'Audios Received': '100',
              'Two-way Interaction Messages': '400',
            },
            class2: {
              'Total Students': '900',
              'Number of Content Read': '800',
              'Videos Received': '290',
              'Images Received': '190',
              'Audios Received': '90',
              'Two-way Interaction Messages': '350',
            },
          },
        },
        February: {
          'Number of Blocks': '152',
          'Number of Clusters': '2,100',
          'Number of Groups': '1,700',
          'Total Students': '26,000',
          'Total Schools': '510',
          'Total Contact Numbers': '21,000',
          'Number of Content Shared': '4,300',
          'Weekly Class wise Content Shared (Classes 1 to 10)': '670',
          'Number of Content Read': '3,400',
          'Videos Received': '950',
          'Images Received': '520',
          'Audios Received': '320',
          'Class wise Number of Students (Classes 1 to 10)': 'Refreshed',
          'Class wise no of students (1 to 10)': 'Dynamic Count',
          'Total number of schools': '255',
          'Total no of Schools': '255',
          'Number of Students': '4,100',
          'Class wise no of students': 'Dynamic',
          'Two-way Interaction Messages': '1,050',
          class: {
            class1: {
              'Total Students': '1,000',
              'Number of Content Read': '850',
              'Videos Received': '300',
              'Images Received': '200',
              'Audios Received': '100',
              'Two-way Interaction Messages': '400',
            },
            class2: {
              'Total Students': '900',
              'Number of Content Read': '800',
              'Videos Received': '290',
              'Images Received': '190',
              'Audios Received': '90',
              'Two-way Interaction Messages': '350',
            },
          },
        },
        March: {
          'Number of Blocks': '153',
          'Number of Clusters': '2,200',
          'Number of Groups': '1,800',
          'Total Students': '27,000',
          'Total Schools': '520',
          'Total Contact Numbers': '22,000',
          'Number of Content Shared': '4,600',
          'Weekly Class wise Content Shared (Classes 1 to 10)': '690',
          'Number of Content Read': '3,600',
          'Videos Received': '1,000',
          'Images Received': '540',
          'Audios Received': '340',
          'Class wise Number of Students (Classes 1 to 10)': 'Upgraded',
          'Class wise no of students (1 to 10)': 'Dynamic Count',
          'Total number of schools': '260',
          'Total no of Schools': '260',
          'Number of Students': '4,200',
          'Class wise no of students': 'Dynamic',
          'Two-way Interaction Messages': '1,100',
          class: {
            class1: {
              'Total Students': '1,000',
              'Number of Content Read': '850',
              'Videos Received': '300',
              'Images Received': '200',
              'Audios Received': '100',
              'Two-way Interaction Messages': '400',
            },
            class2: {
              'Total Students': '900',
              'Number of Content Read': '800',
              'Videos Received': '290',
              'Images Received': '190',
              'Audios Received': '90',
              'Two-way Interaction Messages': '350',
            },
          },
        },
        April: {
          'Number of Blocks': '155',
          'Number of Clusters': '2,300',
          'Number of Groups': '1,900',
          'Total Students': '28,000',
          'Total Schools': '530',
          'Total Contact Numbers': '23,000',
          'Number of Content Shared': '4,900',
          'Weekly Class wise Content Shared (Classes 1 to 10)': '710',
          'Number of Content Read': '3,800',
          'Videos Received': '1,050',
          'Images Received': '560',
          'Audios Received': '360',
          'Class wise Number of Students (Classes 1 to 10)': 'Latest',
          'Class wise no of students (1 to 10)': 'Dynamic Count',
          'Total number of schools': '265',
          'Total no of Schools': '265',
          'Number of Students': '4,300',
          'Class wise no of students': 'Dynamic',
          'Two-way Interaction Messages': '1,150',
          class: {
            class1: {
              'Total Students': '1,000',
              'Number of Content Read': '850',
              'Videos Received': '300',
              'Images Received': '200',
              'Audios Received': '100',
              'Two-way Interaction Messages': '400',
            },
            class2: {
              'Total Students': '900',
              'Number of Content Read': '800',
              'Videos Received': '290',
              'Images Received': '190',
              'Audios Received': '90',
              'Two-way Interaction Messages': '350',
            },
          },
        },
      },
    },

    balasore: {
      2025: {
        January: {
          'Number of Blocks': '120',
          'Number of Clusters': '1,800',
          'Number of Groups': '1,400',
          'Total Students': '18,000',
          'Total Schools': '450',
          'Total Contact Numbers': '15,000',
          'Number of Content Shared': '3,500',
          'Weekly Class wise Content Shared (Classes 1 to 10)': '550',
          'Number of Content Read': '2,800',
          'Videos Received': '800',
          'Images Received': '450',
          'Audios Received': '280',
          'Class wise Number of Students (Classes 1 to 10)': 'Small Distribution',
          'Class wise no of students (1 to 10)': 'Dynamic Count',
          'Total number of schools': '200',
          'Total no of Schools': '200',
          'Number of Students': '3,500',
          'Class wise no of students': 'Dynamic',
          'Two-way Interaction Messages': '900',
          class: {
            class1: {
              'Total Students': '1,000',
              'Number of Content Read': '850',
              'Videos Received': '300',
              'Images Received': '200',
              'Audios Received': '100',
              'Two-way Interaction Messages': '400',
            },
            class2: {
              'Total Students': '900',
              'Number of Content Read': '800',
              'Videos Received': '290',
              'Images Received': '190',
              'Audios Received': '90',
              'Two-way Interaction Messages': '350',
            },
          },
        },
        February: {
          'Number of Blocks': '122',
          'Number of Clusters': '1,900',
          'Number of Groups': '1,500',
          'Total Students': '19,000',
          'Total Schools': '460',
          'Total Contact Numbers': '16,000',
          'Number of Content Shared': '3,700',
          'Weekly Class wise Content Shared (Classes 1 to 10)': '570',
          'Number of Content Read': '3,000',
          'Videos Received': '850',
          'Images Received': '470',
          'Audios Received': '300',
          'Class wise Number of Students (Classes 1 to 10)': 'Updated',
          'Class wise no of students (1 to 10)': 'Dynamic Count',
          'Total number of schools': '205',
          'Total no of Schools': '205',
          'Number of Students': '3,700',
          'Class wise no of students': 'Dynamic',
          'Two-way Interaction Messages': '950',
          class: {
            class1: {
              'Total Students': '1,000',
              'Number of Content Read': '850',
              'Videos Received': '300',
              'Images Received': '200',
              'Audios Received': '100',
              'Two-way Interaction Messages': '400',
            },
            class2: {
              'Total Students': '900',
              'Number of Content Read': '800',
              'Videos Received': '290',
              'Images Received': '190',
              'Audios Received': '90',
              'Two-way Interaction Messages': '350',
            },
          },
        },
        March: {
          'Number of Blocks': '125',
          'Number of Clusters': '2,000',
          'Number of Groups': '1,600',
          'Total Students': '20,000',
          'Total Schools': '470',
          'Total Contact Numbers': '17,000',
          'Number of Content Shared': '3,900',
          'Weekly Class wise Content Shared (Classes 1 to 10)': '590',
          'Number of Content Read': '3,200',
          'Videos Received': '900',
          'Images Received': '490',
          'Audios Received': '320',
          'Class wise Number of Students (Classes 1 to 10)': 'Refreshed Data',
          'Class wise no of students (1 to 10)': 'Dynamic Count',
          'Total number of schools': '210',
          'Total no of Schools': '210',
          'Number of Students': '3,900',
          'Class wise no of students': 'Dynamic',
          'Two-way Interaction Messages': '1,000',
          class: {
            class1: {
              'Total Students': '1,000',
              'Number of Content Read': '850',
              'Videos Received': '300',
              'Images Received': '200',
              'Audios Received': '100',
              'Two-way Interaction Messages': '400',
            },
            class2: {
              'Total Students': '900',
              'Number of Content Read': '800',
              'Videos Received': '290',
              'Images Received': '190',
              'Audios Received': '90',
              'Two-way Interaction Messages': '350',
            },
          },
        },
        April: {
          'Number of Blocks': '128',
          'Number of Clusters': '2,100',
          'Number of Groups': '1,700',
          'Total Students': '21,000',
          'Total Schools': '480',
          'Total Contact Numbers': '18,000',
          'Number of Content Shared': '4,100',
          'Weekly Class wise Content Shared (Classes 1 to 10)': '610',
          'Number of Content Read': '3,400',
          'Videos Received': '950',
          'Images Received': '510',
          'Audios Received': '340',
          'Class wise Number of Students (Classes 1 to 10)': 'Latest Stats',
          'Class wise no of students (1 to 10)': 'Dynamic Count',
          'Total number of schools': '215',
          'Total no of Schools': '215',
          'Number of Students': '4,100',
          'Class wise no of students': 'Dynamic',
          'Two-way Interaction Messages': '1,050',
          class: {
            class1: {
              'Total Students': '1,000',
              'Number of Content Read': '850',
              'Videos Received': '300',
              'Images Received': '200',
              'Audios Received': '100',
              'Two-way Interaction Messages': '400',
            },
            class2: {
              'Total Students': '900',
              'Number of Content Read': '800',
              'Videos Received': '290',
              'Images Received': '190',
              'Audios Received': '90',
              'Two-way Interaction Messages': '350',
            },
          },
        },
      },
    },
    ganjam: {
      2025: {
        January: {
          'Number of Blocks': '110',
          'Number of Clusters': '1,700',
          'Number of Groups': '1,300',
          'Total Students': '15,000',
          'Total Schools': '400',
          'Total Contact Numbers': '12,000',
          'Number of Content Shared': '3,000',
          'Weekly Class wise Content Shared (Classes 1 to 10)': '500',
          'Number of Content Read': '2,500',
          'Videos Received': '750',
          'Images Received': '420',
          'Audios Received': '270',
          'Class wise Number of Students (Classes 1 to 10)': 'Minimal Distribution',
          'Class wise no of students (1 to 10)': 'Dynamic Count',
          'Total number of schools': '190',
          'Total no of Schools': '190',
          'Number of Students': '3,000',
          'Class wise no of students': 'Dynamic',
          'Two-way Interaction Messages': '800',
          class: {
            class1: {
              'Total Students': '1,000',
              'Number of Content Read': '850',
              'Videos Received': '300',
              'Images Received': '200',
              'Audios Received': '100',
              'Two-way Interaction Messages': '400',
            },
            class2: {
              'Total Students': '900',
              'Number of Content Read': '800',
              'Videos Received': '290',
              'Images Received': '190',
              'Audios Received': '90',
              'Two-way Interaction Messages': '350',
            },
          },
        },
        February: {
          'Number of Blocks': '112',
          'Number of Clusters': '1,800',
          'Number of Groups': '1,400',
          'Total Students': '16,000',
          'Total Schools': '410',
          'Total Contact Numbers': '13,000',
          'Number of Content Shared': '3,200',
          'Weekly Class wise Content Shared (Classes 1 to 10)': '520',
          'Number of Content Read': '2,700',
          'Videos Received': '800',
          'Images Received': '440',
          'Audios Received': '290',
          'Class wise Number of Students (Classes 1 to 10)': 'Updated Data',
          'Class wise no of students (1 to 10)': 'Dynamic Count',
          'Total number of schools': '195',
          'Total no of Schools': '195',
          'Number of Students': '3,200',
          'Class wise no of students': 'Dynamic',
          'Two-way Interaction Messages': '850',
          class: {
            class1: {
              'Total Students': '1,000',
              'Number of Content Read': '850',
              'Videos Received': '300',
              'Images Received': '200',
              'Audios Received': '100',
              'Two-way Interaction Messages': '400',
            },
            class2: {
              'Total Students': '900',
              'Number of Content Read': '800',
              'Videos Received': '290',
              'Images Received': '190',
              'Audios Received': '90',
              'Two-way Interaction Messages': '350',
            },
          },
        },
        March: {
          'Number of Blocks': '115',
          'Number of Clusters': '1,900',
          'Number of Groups': '1,500',
          'Total Students': '17,000',
          'Total Schools': '420',
          'Total Contact Numbers': '14,000',
          'Number of Content Shared': '3,400',
          'Weekly Class wise Content Shared (Classes 1 to 10)': '540',
          'Number of Content Read': '2,900',
          'Videos Received': '850',
          'Images Received': '460',
          'Audios Received': '310',
          'Class wise Number of Students (Classes 1 to 10)': 'Updated Stats',
          'Class wise no of students (1 to 10)': 'Dynamic Count',
          'Total number of schools': '200',
          'Total no of Schools': '200',
          'Number of Students': '3,400',
          'Class wise no of students': 'Dynamic',
          'Two-way Interaction Messages': '900',
          class: {
            class1: {
              'Total Students': '1,000',
              'Number of Content Read': '850',
              'Videos Received': '300',
              'Images Received': '200',
              'Audios Received': '100',
              'Two-way Interaction Messages': '400',
            },
            class2: {
              'Total Students': '900',
              'Number of Content Read': '800',
              'Videos Received': '290',
              'Images Received': '190',
              'Audios Received': '90',
              'Two-way Interaction Messages': '350',
            },
          },
        },
        April: {
          'Number of Blocks': '118',
          'Number of Clusters': '2,000',
          'Number of Groups': '1,600',
          'Total Students': '18,000',
          'Total Schools': '430',
          'Total Contact Numbers': '15,000',
          'Number of Content Shared': '3,600',
          'Weekly Class wise Content Shared (Classes 1 to 10)': '560',
          'Number of Content Read': '3,100',
          'Videos Received': '900',
          'Images Received': '480',
          'Audios Received': '330',
          'Class wise Number of Students (Classes 1 to 10)': 'Latest Update',
          'Class wise no of students (1 to 10)': 'Dynamic Count',
          'Total number of schools': '205',
          'Total no of Schools': '205',
          'Number of Students': '3,600',
          'Class wise no of students': 'Dynamic',
          'Two-way Interaction Messages': '950',
          class: {
            class1: {
              'Total Students': '1,000',
              'Number of Content Read': '850',
              'Videos Received': '300',
              'Images Received': '200',
              'Audios Received': '100',
              'Two-way Interaction Messages': '400',
            },
            class2: {
              'Total Students': '900',
              'Number of Content Read': '800',
              'Videos Received': '290',
              'Images Received': '190',
              'Audios Received': '90',
              'Two-way Interaction Messages': '350',
            },
          },
        },
      },
    },
  }

  const fieldConfigs = {
    // 🟩 Structural Counts - District/Block/Cluster/Groups
    'Number of Districts': { color: '#AED581' },
    'Number of Blocks': { color: '#81C784' },
    'Number of Clusters': { color: '#66BB6A' },
    'Number of Groups': { color: '#4DB6AC' },

    // 🟦 Student & School Metrics
    'Total Students': { color: '#64B5F6' },
    'Total Schools': { color: '#4FC3F7' },
    'Total number of schools': { color: '#4FC3F7' },
    'Total no of Schools': { color: '#4FC3F7' },
    'Number of Students': { color: '#64B5F6' },

    // 🟪 Contact Info
    'Total Contact Numbers': { color: '#BA68C8' },

    // 🟨 Content Sharing Metrics
    'Number of Content Shared': { color: '#FFD54F' },
    'Weekly Class wise Content Shared (Classes 1 to 10)': { color: '#FFCA28' },
    'Number of Content Read': { color: '#FFB300' },

    // 🟧 Media Shared
    'Videos Received': { color: '#FF8A65' },
    'Images Received': { color: '#FF7043' },
    'Audios Received': { color: '#FF5722' },

    // 🟫 Class-wise Student Counts
    'Class wise Number of Students (Classes 1 to 10)': { color: '#A1887F' },
    'Class wise no of students (1 to 10)': { color: '#A1887F' },
    'Class wise no of students': { color: '#A1887F' },

    // 🟥 Communication
    'Two-way Interaction Messages': { color: '#E57373' },
  }

  const progressChartFields = [
    'Number of Blocks',
    'Number of Clusters',
    'Number of Groups',
    'Total Students',
    'Total Schools',
    'Total Contact Numbers',
  ]

  const getProgressChartData = (dashboardValues) => {
    const labels = []
    const data = []

    progressChartFields.forEach((field) => {
      const value = dashboardValues[field]
      if (value && !isNaN(Number(value.replace(/,/g, '')))) {
        labels.push(field)
        data.push(Number(value.replace(/,/g, '')))
      }
    })

    return {
      labels,
      datasets: [
        {
          label: 'Status Count',
          data,
          backgroundColor: '#42a5f5',
        },
      ],
    }
  }

  const getLineChartData = (dashboard) => {
    const metricKeys = [
      'Number of Content Shared',
      'Weekly Class wise Content Shared (Classes 1 to 10)',
      'Number of Content Read',
      'Videos Received',
      'Images Received',
      'Audios Received',
      'Two-way Interaction Messages',
    ]

    const labels = []
    const data = []

    metricKeys.forEach((key) => {
      const value = dashboard[key]

      if (value && !isNaN(parseInt(value.replace(/,/g, '')))) {
        labels.push(key)
        data.push(parseInt(value.replace(/,/g, '')))
      }
    })

    return {
      labels,
      datasets: [
        {
          label: 'Dashboard Metrics',
          data,
          fill: false,
          borderColor: '#42a5f5',
          backgroundColor: '#42a5f5',
          tension: 0.3,
        },
      ],
    }
  }

  const selectedRegionKey = filters.district?.toLowerCase()
  const hasDateSelected = selectedYear && selectedMonth

  let selectedDashboardValues = dashboardValues

  if (selectedRegionKey) {
    const regionData = dashboardValuesByRegion[selectedRegionKey]

    // Choose the right month/year:
    const yearToUse = hasDateSelected ? selectedYear : 2025
    const monthToUse = hasDateSelected ? selectedMonth : 'April'

    const dataForRegionAndDate = regionData?.[yearToUse]?.[monthToUse]

    if (dataForRegionAndDate) {
      if (filters.class && dataForRegionAndDate.class?.[filters.class.toLowerCase()]) {
        selectedDashboardValues = dataForRegionAndDate.class[filters.class.toLowerCase()]
      } else {
        selectedDashboardValues = dataForRegionAndDate
      }
    } else {
      console.warn('No data for selected date or default. Showing base values.')
    }
  }

  if (!dashboardValuesByRegion[selectedRegionKey]?.[selectedYear]?.[selectedMonth]) {
    console.warn('No data for selected date range. Showing default values.')
  }

  const lineData = getLineChartData(selectedDashboardValues)
  const progressData = getProgressChartData(selectedDashboardValues)
  return (
    <div
      style={{
        padding: '20px',
        background: 'linear-gradient(135deg, #e0f7fa, #fce4ec)',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      {/* Filters */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginBottom: '30px',
          maxWidth: '100%',
          padding: '0 16px',
          boxSizing: 'border-box',
        }}
      >
        <Select
          options={districts}
          value={districts.find((d) => d.value === filters.district)}
          onChange={handleDistrictChange}
          styles={customStyles}
          isClearable
          isSearchable
          placeholder="Select District"
          components={{ Option: CustomOption }}
        />
        <Select
          options={blocksData[filters.district] || []}
          value={(blocksData[filters.district] || []).find((b) => b.value === filters.block)}
          onChange={handleBlockChange}
          styles={customStyles}
          isClearable
          isSearchable
          placeholder="Select Block"
          components={{ Option: CustomOption }}
        />
        <Select
          options={clustersData[filters.block] || []}
          value={(clustersData[filters.block] || []).find((c) => c.value === filters.cluster)}
          onChange={handleClusterChange}
          styles={customStyles}
          isClearable
          isSearchable
          placeholder="Select Cluster"
          components={{ Option: CustomOption }}
        />
        <Select
          options={schoolsData[filters.cluster] || []}
          value={(schoolsData[filters.cluster] || []).find((s) => s.value === filters.school)}
          onChange={handleSchoolChange}
          styles={customStyles}
          isClearable
          isSearchable
          placeholder="Select School"
          components={{ Option: CustomOption }}
        />
        {filters.school && (
          <Select
            options={classOptions}
            value={classOptions.find((cls) => cls.value === filters.class)}
            onChange={handleClassChange}
            styles={customStyles}
            isClearable
            isSearchable
            placeholder="Select Class"
          />
        )}

        <div>
          <RangePicker
            format="DD.MM.YYYY"
            value={selectedRange}
            onChange={handleRangeChange}
            style={{
              ...dateStyle,
              width: '100%',
            }}
            placeholder={['Start Date', 'End Date']}
          />
        </div>
      </div>

      {/* ADD ROWS */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          // maxWidth: '1400px',
          // margin: '0 auto 30px auto',
          justifyContent: 'center',
          padding: '0 16px',
          boxSizing: 'border-box',
        }}
      >
        {getDashboardFields(filters).map((field) => {
          const value = selectedDashboardValues[field]
          if (!value) return null

          return (
            <div
              key={field}
              style={{
                flex: '1 1 220px',
                maxWidth: '250px',
                backgroundColor: fieldConfigs[field]?.color || '#E0E0E0',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>{value}</h3>
              <p style={{ margin: 0, fontSize: '14px' }}>{field}</p>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '20px',
          maxWidth: '1400px',
          margin: '30px auto',
          padding: '0 16px',
        }}
      >
        {lineData.labels.length > 0 && (
          <div style={cardStyle}>
            <h3 style={{ marginBottom: '16px', textAlign: 'center' }}>
              Dashboard Content & Engagement Overview
            </h3>
            <Line data={lineData} options={barOptions} />
          </div>
        )}

        {progressData.labels.length > 0 && (
          <div style={cardStyle}>
            <h3 style={{ marginBottom: '16px', textAlign: 'center' }}>
              Status of In-Progress Teachers
            </h3>
            <Bar data={progressData} options={barOptions} />
          </div>
        )}

        {/* Table datas */}
        <div style={{ ...cardStyle, gridColumn: '1 / -1' }}>
          <h3 style={{ marginBottom: '16px', textAlign: 'center' }}>
            District wise teacher/school list
          </h3>

          <div
            ref={containerRef}
            onScroll={handleScroll}
            style={{
              maxHeight: '400px',
              overflowY: 'auto',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
          >
            <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f0f0f0', position: 'sticky', top: 0 }}>
                <tr>
                  <th style={thStyle}>District</th>
                  <th style={thStyle}>Block</th>
                  <th style={thStyle}>Groups</th>
                  <th style={thStyle}>Clusters</th>
                  <th style={thStyle}>Students</th>
                  <th style={thStyle}>Schools</th>
                  <th style={thStyle}>Contact Numbers</th>
                  {Array.from({ length: 10 }, (_, i) => (
                    <th key={i} style={thStyle}>
                      Class {i + 1}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>{renderRows()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
Dashboard.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}
export default Dashboard
