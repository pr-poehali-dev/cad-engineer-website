import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [serviceType, setServiceType] = useState('');
  const [area, setArea] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const { toast } = useToast();

  const services = [
    { value: 'land-plot', label: 'Межевание земельного участка', basePrice: 15000, pricePerUnit: 300 },
    { value: 'tech-plan', label: 'Технический план здания', basePrice: 20000, pricePerUnit: 500 },
    { value: 'document', label: 'Акт обследования', basePrice: 12000, pricePerUnit: 200 },
    { value: 'consultation', label: 'Консультация', basePrice: 5000, pricePerUnit: 0 },
  ];

  const calculatePrice = () => {
    const service = services.find(s => s.value === serviceType);
    if (service && area) {
      const total = service.basePrice + (service.pricePerUnit * parseFloat(area));
      setCalculatedPrice(total);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://functions.poehali.dev/cd85f0e4-459d-4e82-ba54-589812f8b989', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formName,
          phone: formPhone,
          email: formEmail,
          message: formMessage,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: 'Заявка отправлена!',
          description: 'Мы свяжемся с вами в ближайшее время.',
        });
        setFormName('');
        setFormPhone('');
        setFormEmail('');
        setFormMessage('');
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Не удалось отправить заявку',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить заявку. Попробуйте позже.',
        variant: 'destructive',
      });
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.observe-fade').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background blueprint-bg">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="MapPin" size={28} className="text-primary" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary">Городской кадастр недвижимости</span>
              <span className="text-xs text-muted-foreground">ООО</span>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:text-primary transition-colors">
              Главная
            </button>
            <button onClick={() => scrollToSection('services')} className="text-sm font-medium hover:text-primary transition-colors">
              Услуги
            </button>
            <button onClick={() => scrollToSection('calculator')} className="text-sm font-medium hover:text-primary transition-colors">
              Калькулятор
            </button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary transition-colors">
              О компании
            </button>
            <button onClick={() => scrollToSection('contacts')} className="text-sm font-medium hover:text-primary transition-colors">
              Контакты
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="py-20 bg-gradient-to-br from-secondary/50 via-accent/20 to-primary/10 relative overflow-hidden blueprint-pattern">
          <div className="absolute top-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent/15 rounded-full blur-3xl"></div>
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6 observe-fade">
              <div className="inline-block p-3 bg-white/80 backdrop-blur rounded-2xl mb-4 shadow-lg">
                <Icon name="Compass" size={48} className="text-primary" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight">
                Профессиональные кадастровые услуги
              </h1>
              <p className="text-xl text-muted-foreground">
                Точность, надёжность и соблюдение всех законодательных норм
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button onClick={() => scrollToSection('calculator')} size="lg" className="font-semibold bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all">
                  Рассчитать стоимость
                </Button>
                <Button onClick={() => scrollToSection('contacts')} size="lg" variant="outline" className="font-semibold">
                  Связаться с нами
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-20 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-secondary/10 to-transparent rounded-full blur-3xl"></div>
          <div className="container">
            <div className="text-center mb-12 observe-fade">
              <h2 className="text-4xl font-bold mb-4">Наши услуги</h2>
              <p className="text-muted-foreground text-lg">Полный спектр кадастровых работ</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow observe-fade animation-delay-100">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="MapPin" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Межевание земельных участков</CardTitle>
                  <CardDescription>
                    Установление и закрепление границ земельного участка на местности
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow observe-fade animation-delay-200">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="FileText" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Технические планы</CardTitle>
                  <CardDescription>
                    Подготовка технических планов зданий и сооружений для регистрации прав
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow observe-fade animation-delay-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="BarChart3" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Акты обследования</CardTitle>
                  <CardDescription>
                    Составление актов обследования объектов недвижимости
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow observe-fade animation-delay-400">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="Award" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Вынос границ в натуру</CardTitle>
                  <CardDescription>
                    Определение и обозначение границ участка на местности
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow observe-fade animation-delay-500">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="Search" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Топографическая съёмка</CardTitle>
                  <CardDescription>
                    Создание топографических планов местности для проектирования
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow observe-fade animation-delay-600">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="MessageCircle" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Консультации</CardTitle>
                  <CardDescription>
                    Профессиональные консультации по кадастровым вопросам
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section id="calculator" className="py-20 bg-gradient-to-br from-accent/15 via-secondary/20 to-primary/10 relative overflow-hidden">
          <div className="absolute inset-0 blueprint-pattern opacity-30"></div>
          <div className="container">
            <div className="max-w-2xl mx-auto observe-fade">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl">Калькулятор стоимости услуг</CardTitle>
                  <CardDescription>
                    Рассчитайте приблизительную стоимость кадастровых работ
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="service">Выберите тип услуги</Label>
                    <Select value={serviceType} onValueChange={setServiceType}>
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="area">Площадь объекта (м²)</Label>
                    <Input
                      id="area"
                      type="number"
                      placeholder="Введите площадь"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                    />
                  </div>

                  <Button onClick={calculatePrice} className="w-full font-semibold" size="lg">
                    Рассчитать стоимость
                  </Button>

                  {calculatedPrice !== null && (
                    <div className="mt-6 p-6 bg-primary/5 rounded-lg border-2 border-primary/20">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">Приблизительная стоимость</p>
                        <p className="text-4xl font-bold text-primary">
                          {calculatedPrice.toLocaleString('ru-RU')} ₽
                        </p>
                        <p className="text-xs text-muted-foreground mt-4">
                          Окончательная стоимость определяется после осмотра объекта
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="about" className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto observe-fade">
              <h2 className="text-4xl font-bold mb-6 text-center">О компании</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Мы являемся аккредитованными кадастровыми инженерами с многолетним опытом работы.
                  Наша команда специализируется на предоставлении полного спектра кадастровых услуг
                  для физических и юридических лиц.
                </p>
                <p>
                  Мы гарантируем высокое качество выполнения работ, соблюдение всех законодательных
                  требований и индивидуальный подход к каждому клиенту.
                </p>
              </div>
              
              <Separator className="my-10" />
              
              <div className="grid md:grid-cols-3 gap-8 text-center observe-fade animation-delay-200">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">10+</div>
                  <div className="text-muted-foreground">лет опыта</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-muted-foreground">выполненных проектов</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-muted-foreground">довольных клиентов</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-secondary/20 via-accent/10 to-primary/5 relative">
          <div className="absolute top-20 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="container">
            <div className="text-center mb-12 observe-fade">
              <h2 className="text-4xl font-bold mb-4">Наши преимущества</h2>
              <p className="text-muted-foreground text-lg">Почему выбирают нас</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center observe-fade animation-delay-100">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name="ShieldCheck" size={32} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Лицензия и аккредитация</h3>
                  <p className="text-sm text-muted-foreground">Все специалисты имеют официальную аккредитацию и квалификацию</p>
                </CardContent>
              </Card>

              <Card className="text-center observe-fade animation-delay-200">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name="Clock" size={32} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Быстрые сроки</h3>
                  <p className="text-sm text-muted-foreground">Выполнение работ в установленные сроки без задержек</p>
                </CardContent>
              </Card>

              <Card className="text-center observe-fade animation-delay-300">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name="FileCheck" size={32} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Гарантия качества</h3>
                  <p className="text-sm text-muted-foreground">Все документы соответствуют требованиям законодательства</p>
                </CardContent>
              </Card>

              <Card className="text-center observe-fade animation-delay-400">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name="Handshake" size={32} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Индивидуальный подход</h3>
                  <p className="text-sm text-muted-foreground">Персональное решение для каждого клиента</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12 observe-fade">
              <h2 className="text-4xl font-bold mb-4">Отзывы клиентов</h2>
              <p className="text-muted-foreground text-lg">Что говорят о нас</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="observe-fade animation-delay-100">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    <Icon name="Star" size={20} className="text-accent fill-accent" />
                    <Icon name="Star" size={20} className="text-accent fill-accent" />
                    <Icon name="Star" size={20} className="text-accent fill-accent" />
                    <Icon name="Star" size={20} className="text-accent fill-accent" />
                    <Icon name="Star" size={20} className="text-accent fill-accent" />
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "Профессиональный подход и быстрое выполнение межевания участка. Все документы оформили без единой ошибки. Рекомендую!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="User" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Алексей М.</div>
                      <div className="text-sm text-muted-foreground">Межевание участка</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="observe-fade animation-delay-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    <Icon name="Star" size={20} className="text-accent fill-accent" />
                    <Icon name="Star" size={20} className="text-accent fill-accent" />
                    <Icon name="Star" size={20} className="text-accent fill-accent" />
                    <Icon name="Star" size={20} className="text-accent fill-accent" />
                    <Icon name="Star" size={20} className="text-accent fill-accent" />
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "Обратились за техническим планом здания. Работа выполнена качественно и в срок. Сотрудники компетентны и вежливы."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="User" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Мария К.</div>
                      <div className="text-sm text-muted-foreground">Технический план</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="observe-fade animation-delay-300">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    <Icon name="Star" size={20} className="text-accent fill-accent" />
                    <Icon name="Star" size={20} className="text-accent fill-accent" />
                    <Icon name="Star" size={20} className="text-accent fill-accent" />
                    <Icon name="Star" size={20} className="text-accent fill-accent" />
                    <Icon name="Star" size={20} className="text-accent fill-accent" />
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "Отличная компания! Помогли с консультацией по всем вопросам, подготовили все необходимые документы. Спасибо!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="User" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Дмитрий П.</div>
                      <div className="text-sm text-muted-foreground">Консультация</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="contacts" className="py-20 bg-gradient-to-br from-primary/5 via-secondary/15 to-accent/10">
          <div className="container">
            <div className="max-w-2xl mx-auto observe-fade">
              <h2 className="text-4xl font-bold mb-6 text-center">Контакты</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Phone" size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Телефон</div>
                        <a href="tel:+79118449565" className="text-muted-foreground hover:text-primary">
                          +7 (911) 844-95-65
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Mail" size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Email</div>
                        <a href="mailto:conti100@gmail.com" className="text-muted-foreground hover:text-primary">
                          conti100@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="MapPin" size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Адрес</div>
                        <p className="text-muted-foreground">
                          г. Санкт-Петербург, ул. Ворошилова, д. 2, БЦ "Охта"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Clock" size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Режим работы</div>
                        <p className="text-muted-foreground">
                          Пн-Пт: 9:00 - 18:00<br />
                          Сб-Вс: выходной
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-8 observe-fade animation-delay-200">
                <CardHeader>
                  <CardTitle className="text-2xl">Оставить заявку</CardTitle>
                  <CardDescription>
                    Заполните форму и мы свяжемся с вами в ближайшее время
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя *</Label>
                      <Input
                        id="name"
                        placeholder="Ваше имя"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Сообщение *</Label>
                      <Textarea
                        id="message"
                        placeholder="Опишите вашу задачу или задайте вопрос"
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        rows={4}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full font-semibold" size="lg">
                      Отправить заявку
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-white">
        <div className="container">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 ООО "Городской кадастр недвижимости". Все права защищены.</p>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/79118449565"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
        aria-label="Написать в WhatsApp"
      >
        <svg
          className="w-9 h-9 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"></span>
      </a>
    </div>
  );
};

export default Index;