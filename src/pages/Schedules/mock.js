export const mockSchedules = [
  {
    id: 1,
    active: true,
    serviceManager: {
      id: 11,
      name: 'Monochrome'
    },
    defaultSupervisor: {
      id: 12,
      name: 'MonoSupervisor'
    },
    scheduleName: 'Bản kế hoạch 001'
  },
  {
    id: 2,
    active: false,
    serviceManager: {
      id: 22,
      name: 'Monochrome'
    },
    defaultSupervisor: {
      id: 22,
      name: 'MonoSupervisor'
    },
    scheduleName: 'Bản kế hoạch 043'
  },
  {
    id: 3,
    active: true,
    serviceManager: {
      id: 3,
      name: 'Monochrome'
    },
    defaultSupervisor: {
      id: 32,
      name: 'MonoSupervisor'
    },
    scheduleName: 'Bản kế hoạch 003'
  },
  {
    id: 4,
    active: true,
    serviceManager: {
      id: 4,
      name: 'Monochrome'
    },
    defaultSupervisor: {
      id: 42,
      name: 'MonoSupervisor'
    },
    scheduleName: 'Bản kế hoạch 0011'
  },
  {
    id: 5,
    active: false,
    serviceManager: {
      id: 5,
      name: 'Monochrome'
    },
    defaultSupervisor: {
      id: 52,
      name: 'MonoSupervisor'
    },
    scheduleName: 'Bản kế hoạch 005'
  },
]

export const mockScheduleUnits = [
  {
    id: 1,
    start_at: '07/09/2021 06:00',
    end_at: '07/09/2021 18:00',
    labor: 'Oggy'
  },
  {
    id: 2,
    start_at: '08/09/2021 10:00',
    end_at: '08/09/2021 12:00',
    labor: 'Joe'
  },
  {
    id: 3,
    start_at: '08/09/2021 09:00',
    end_at: '08/09/2021 12:00',
    labor: 'Jack'
  },
  {
    id: 4,
    start_at: '09/09/2021 12:00',
    end_at: '09/09/2021 18:00',
    labor: 'Dee Dee'
  },
  {
    id: 5,
    start_at: '09/09/2021 00:00',
    end_at: '16/09/2021 00:00',
    labor: 'Bob'
  },
]

export const mockLaborer = [
  {
    id: 1,
    name: 'Oggy',
    phone: '+43 882-221'
  },
  {
    id: 2,
    name: 'Jack',
    phone: '+62 324-432'
  },
  {
    id: 3,
    name: 'Bob',
    phone: '+61 009-711'
  },
  {
    id: 4,
    name: 'Joe',
    phone: '+55 092-814'
  },
  {
    id: 6,
    name: 'Marky',
    phone: '+81 701-711'
  },
  {
    id: 7,
    name: 'Dee Dee',
    phone: '+41 610-914'
  }
]