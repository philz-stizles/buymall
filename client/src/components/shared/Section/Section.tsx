import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { Container } from '..';
import { Heading } from '../../ui';

type Props = {
  id?: string;
  className?: string;
  containerClasses?: string;
  headingClasses?: string;
  fluid?: boolean;
  title?: string;
  subTitle?: string;
  headingAlignment?: 'left' | 'right' | 'center';
};

const Section = ({
  children,
  id,
  className,
  containerClasses,
  headingClasses,
  headingAlignment = 'center',
  fluid = false,
  title,
  subTitle,
}: PropsWithChildren<Props>) => {
  return (
    <section id={id} className={classNames('py-16', className)}>
      {/* flex flex-col */}
      <Container fluid={fluid} className={containerClasses}>
        {(title || subTitle) && (
          <div
            className={classNames(
              'flex flex-col justify-center',
              headingAlignment === 'left' && 'items-start text-left',
              headingAlignment === 'center' && 'items-center text-center',
              headingAlignment === 'right' &&
                'items-end text-right'
            )}
          >
            <Heading
              title={title}
              subTitle={subTitle}
              className={headingClasses}
            />
          </div>
        )}
        {children}
      </Container>
    </section>
  );
};

export default Section;
